import React from 'react'

function Heading({ title }) {
    return (
        <h1 className="text-sm sm:text-lg font-bold text-gray-800 text-center">
            {title}
        </h1>
    )
}

export default Heading