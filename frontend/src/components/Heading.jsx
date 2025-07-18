import React from 'react'

function Heading({ title }) {
    return (
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center">
            {title}
        </h1>
    )
}

export default Heading