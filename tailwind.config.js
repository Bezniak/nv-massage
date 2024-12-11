/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js", // Подключение Flowbite
    ],
    theme: {
        extend: {
            backgroundImage: {
                'down-list': "url('/src/assets/downList.png')", // путь к изображению
                'twoLists': "url('/src/assets/twoLists.png')", // путь к изображению
                'longListDown': "url('/src/assets/longListDown.png')", // путь к изображению
                'twoUpList': "url('/src/assets/twoUpList.png')", // путь к изображению
                'twoDown': "url('/src/assets/twoDown.png')", // путь к изображению
            },
            backgroundPosition: {
                'top-right': 'top right',
                'top-left': 'top left',
                'bottom-center': 'bottom center',
                'bottom-left': 'bottom left',
            },
            backgroundSize: {
                contain: 'auto', // Подгоняет размер по содержимому
            },
            width: {
                'w-95': '92.5%'
            },
            screens: {
                'xs': '320px',
                // => @media (min-width: 320) { ... }

                'sm': '640px',
                // => @media (min-width: 640px) { ... }

                'md': '768px',
                // => @media (min-width: 768px) { ... }

                'lg': '1024px',
                // => @media (min-width: 1024px) { ... }

                'xl': '1280px',
                // => @media (min-width: 1280px) { ... }

                '2xl': '1536px',
                // => @media (min-width: 1536px) { ... }
            },
            colors: {
                'soft-white': '#f5f5f5',
                'active': '#F59B90',// Определите желаемый оттенок
            },
        }
    },
    plugins: [
        require("flowbite/plugin"), // Подключение плагина Flowbite
    ],
};
