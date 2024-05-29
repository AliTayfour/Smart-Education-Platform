// import React, { useEffect, useState } from 'react';
// import "../style/ScrollToTopButton.css"

// export default function ScrollToTopButton() {
//     const [showScrollButton, setShowScrollButton] = useState(false); // تحديث القيمة إلى false في البداية

//     useEffect(() => {
//         const handleScroll = () => {
//             setShowScrollButton(window.pageYOffset > 50);
//         };

//         window.addEventListener('scroll', handleScroll);

//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     const handleScrollToTop = () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     };

//     return (
//         <button className={`scroll-to-top ${showScrollButton ? 'show' : ''}`} onClick={handleScrollToTop}>
//             <div className="arrow-icon"></div>
//         </button>
//     );
// }
