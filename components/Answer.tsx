import React from "react";

interface Answer {
    answer: String;
}

export default function Answer({ answer }: Answer) {
    return (
        <>
            <h1>{answer}</h1>
        </>
    )
}
