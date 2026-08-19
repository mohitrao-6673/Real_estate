const chatModel = require("../../model/chatModel");
let mongoose = require('mongoose')


// create chat between buyer and seller
let creatChat = async (req, res) => {
    try {
        let { propertyId, provideSellerId, provideBuyerId } = req.body

        let buyerId;
        let sellerId;
        if (req.user.role == 'seller') {
            buyerId = provideBuyerId,
                sellerId = req.user.id
        }
        else {
            buyerId = req.user.id,
                sellerId = provideSellerId
        }

        let chat = await chatModel.findOne({
            buyer: buyerId,
            seller: sellerId,
            property: propertyId
        })


        // if the chat is not found then create the chat
        if (!chat) {
            chat = await chatModel.create({
                property: propertyId,
                seller: sellerId,
                buyer: buyerId,
                messages: []
            })
        }

        chat = await chatModel.findById(chat._id)
            .populate('buyer', 'firstName lastName email profilePic')
            .populate('seller', 'firstName lastName email profilePic')
            .populate('property', 'title price images')

        res.send({
            status: 1,
            message: 'Create Chat',
            chat
        })
    }
    catch (error) {
        res.send({
            status: 0,
            message: error
        })
        console.log(error)
    }
}


// send chat
let sendChat = async (req, res) => {
    try {
        console.log( req.body)
        let { chatId, text, image } = req.body

        let userId = req.user.id

        let chat = await chatModel.findById(chatId)

        if (!chat) {
            return res.send({
                status: 0,
                message: 'chat is not found'
            })
        }

        //    sender is part of this chat or not
        if (chat.buyer.toString() !== userId && chat.seller.toString() !== userId) {
            res.send({
                status: 0,
                message: 'you are not part of this chat'
            })
        }

        let newMessage = {
            sender: userId,
            text,
            image,
            createdAt: new Date()
        }

        chat.messages.push(newMessage)
        await chat.save()

        let saveMessages = chat.messages[chat.messages.length - 1]

        res.send({
            status: 1,
            chat,
            newMessage: saveMessages
        })

    }

    catch (error) {
        res.send({
            status: 0,
            message: error
        })
        console.log(error)
    }
}


//get chat all user
let getChat = async (req, res) => {
    try {
        let userId = req.user.id

        let chats = await chatModel.find({
            $or: [
                { buyer: userId },
                { seller: userId }
            ]
        })
            .populate('buyer', 'firstName lastName email profilePic')
            .populate('seller', 'firstName lastName email profilePic')
            .populate('property', 'title price images')
            .sort({ updatedAt: -1 })

        res.send({
            status: 1,
            message: 'get chat',
            chats
        })
    }

    catch (error) {
        res.send({
            status: 0,
            message: error
        })
        console.log(error)
    }
}


// get chat messages
let getChatMessage = async (req, res) => {
    try {
        
        let chat = await chatModel.findById(req.params.chatId).populate(
            'messages.sender',
            'name profilePic'
        )

        if (!chat) {
            return res.send({
                status: 0,
                message: 'Chat Is Not Found'
            })
        }

        let userId = req.user.id.toString()
        if (chat.buyer.toString() !== userId && chat.seller.toString() !== userId) {
            return res.send({
                status: 0,
                message: 'you not authorized'
            })
        }

        res.send({
            status: 1,
            message: 'chat view',
            chat
        })


    }

    catch (error) {
        res.send({
            status: 0,
            message: error
        })
        console.log(error)
    }
}



//delet entire chat
let deleteEntireChat = async (req, res) => {
    try {
        let userId = req.user.id
        let chat = await chatModel.findById(req.params.chatId)
        if (!chat) return res.send({ message: 'chat is not found' })

        //    sender is part of this chat or not
        if (chat.buyer.toString() !== userId.toString() && chat.seller.toString() !== userId.toString()) {
            res.send({
                status: 0,
                message: 'you are not part of this chat'
            })
        }

         console.log(chat)
        await chatModel.findByIdAndDelete(req.params.chatId)
        res.send({
            status: 1,
            message: 'Chat Deleted Successfully'
        })
    }
    catch (error) {
        res.send({
            status: 0,
            message: error
        })
        console.log(error)
    }
}



//delet a message form chat
// let deleteMessage = async (req, res) => {
//     try {
//         let userId = req.user.id
//         let chat = await chatModel.findById(req.params.chatId)
//         if (!chat) return res.send({ message: 'chat is not found' })


//             let message = chat.messages.
//         //    sender is part of this chat or not
//         if (chat.buyer.toString() !== userId.toString() && chat.seller.toString() !== userId.toString()) {
//             res.send({
//                 status: 0,
//                 message: 'you are not part of this chat'
//             })
//         }


//         await chatModel.findByIdAndDelete(req.params.chatId)
//         res.send({
//             status: 1,
//             message: 'Chat Deleted Successfully'
//         })
//     }
//     catch (error) {
//         res.send({
//             status: 0,
//             message: error
//         })
//         console.log(error)
//     }
// }


module.exports = { creatChat, sendChat, getChat, getChatMessage, deleteEntireChat }