import { Suspense } from "react";
import MessageContent from "./MessageContent";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading messages...</div>}>
            <MessageContent />
        </Suspense>
    );
}