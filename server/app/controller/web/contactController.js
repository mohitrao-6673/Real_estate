const { transporter } = require("../../config/mailConfig")
const contactModel = require("../../model/contactModel")


// send inquiry
let creatContact = async (req, res) => {
    try {
        let { name, email, message, phone, role } = req.body
        let contact = new contactModel({ name, email, message, phone, role })
        await contact.save()

        let adminMessage = `
        <div style=" font-family: Arial , sans-serif; max-width: 600px; margin: 0 auto; color : #0000FF " >
                <h1 style="  color : #0d9488;  " >
                    New Contact Request
                </h1>
                <p>You Have Received a New Message Form The Platform.</p>
                <div style=" background : #f8fafc; padding : 20px; border-radius:10px; border: 1px solid;  " >
                    <p> <strong>Name:</strong> ${name} </p>
                    <p> <strong>email:</strong> ${email} </p>
                    <p> <strong>phone:</strong> ${phone} </p>
                    <p> <strong>role:</strong> ${role} </p>
                    <p style=" margin-top: 15px; " > <strong>Message:</strong></p>
                    <p style=" font-style: italic: color: #475569; " >
                        ' ${message}'
                    </p>
                </div>
            </div>
       `

        try {
            let info = await transporter.sendMail({
                to: 'mohitrao56722@gmail.com', // list of receivers
                subject: `New Contact Message From ${name}  `, // Subject line
                html: adminMessage,
            });


            res.send({
                status: 1,
                message: 'Message Sent Successfully',
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
    catch (error) {
        res.send({
            status: 0,
            message: 'Message Not Sent',
            message: error
        })
        console.log(error)
    }
}


// get all contact
let getAllContact = async (req, res) => {
    try {
        let contact = await contactModel.find().sort({ createdAt: -1 })
        res.send({
            status: 1,
            message: 'view',
            data: contact
        })
    }
    catch (error) {
        res.send({
            status: 0,
            message: 'error', error
        })
    }
}



///contact delete
let contactDelete = async (req, res) => {
    try {

        let contact = await contactModel.deleteOne({ _id: req.params.id })
        res.send({
            status: 1,
            message: 'Contact Deleted Successfully',
            data: contact
        })

    }
    catch (error) {
        res.send({
            status: 0,
            message: 'error', error
        })
    }
}

module.exports = { creatContact, getAllContact, contactDelete }