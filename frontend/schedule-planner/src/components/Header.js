import React from 'react';

function Header() {
    return (
        <nav class="flex items-center justify-between flex-wrap p-6">
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow">
            <a href="/" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue mr-4">
                Docs
            </a>
            <a href="/" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue mr-4">
                Examples
            </a>
            <a href="/" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue">
                Blog
            </a>
            </div>
            <div>
            <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Account</a>
            </div>
        </div>
        </nav>
    );
}

export default Header;