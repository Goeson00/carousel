(function Carousel() {

    const slidesBtnWrapper = document.querySelector(".slides-btn-wrapper"),
    indicatorsWrapper = document.querySelector(".slides-indicators"),
    indicators = document.querySelectorAll(".slides-indicators li");
    
    let currentOffset = 0,
    currentSlide = 0, // starts at 0 for array utility
    prevSlide;
    
    slidesBtnWrapper.addEventListener("click", toggleCarousel);
    indicatorsWrapper.addEventListener("click", switchCarousel);
    
    function toggleCarousel(event) {
        const slides = document.querySelectorAll(".slides li"),
        btn = event.target.classList[1],
        
        slide = {
            isFirst: currentSlide == 0,
            isLast: currentSlide == slides.length - 1,
            next: toggleSlide("next", "indicator-is-next", "indicator-is-switched-next"),
            prev: toggleSlide("prev", "indicator-is-prev", "indicator-is-swithced-prev")
        };
        
        function toggleSlide(directionProp, currentIndicatorClass, prevIndicatorClass) {
            const direction = {
                next: () => currentSlide++,
                prev: () => currentSlide--
            }
            
            return () => {
                prevSlide = currentSlide;
                direction[directionProp]();
                offsetSlide();
                toggleIndicatorsClasses(currentIndicatorClass, prevIndicatorClass);
            }
        }
        
        function toggleIndicatorsClasses(currentIndicatorClass, prevIndicatorClass) {
            indicators[currentSlide].className = currentIndicatorClass;
            indicators[prevSlide].className = prevIndicatorClass;
        }
        
        if (btn == "slides-next" && !slide.isLast) {
            slide.next();
        } else if (btn == "slides-prev" && !slide.isFirst) {
            slide.prev();
        }
    }
    
    function switchCarousel(event) {
    
        const clickedIndicator = event.target.parentElement,
        clickedIndicatorIdx = getClickedIndicatorIdx(),
        
        slide = {
            switch: () => {
                let isNext,
                isPrev;
                
                prevSlide = currentSlide;
                currentSlide = clickedIndicatorIdx;
                
                isNext = currentSlide > prevSlide;
                isPrev = currentSlide < prevSlide;
                
                offsetSlide();
                
                if (isNext) {
                    toggleIndicatorsClasses("indicator-is-next", "indicator-is-switched-next", "isNext");
                } else if (isPrev) {
                    toggleIndicatorsClasses("indicator-is-prev", "indicator-is-switched-prev", "isPrev");
                }
            }
        };
        
        
        function getClickedIndicatorIdx() {
            let indicatorIdx;
            
            indicators.forEach((indicator, idx) => {
                const idxIsMatched = clickedIndicator == indicator; 
                if (idxIsMatched) {
                    indicatorIdx = idx;
                }
            });
            
            return indicatorIdx;
        }
        
        function toggleIndicatorsClasses(currentIndicatorClass, prevIndicatorClass, directionProp) {
            indicators[currentSlide].className = currentIndicatorClass;
            indicators.forEach((indicator, idx) => {
                const direction = {
                    isPrev: idx > currentSlide,
                    isNext: idx < currentSlide
                }
                
                if (direction[directionProp]) {
                    indicator.className = prevIndicatorClass;
                }
            });
        }
        
        if (event.target.tagName == "BUTTON") {
            slide.switch();
        }
    }
    
    function offsetSlide() {
        const carouselWrapper = document.querySelector(".carousel-wrapper"),
        slidesWrapper = document.querySelector(".slides"),
        offsetDistance = carouselWrapper.clientWidth;
        
        currentOffset = -(currentSlide * offsetDistance);
        slidesWrapper.style.transform = `translateX(${currentOffset}px)`;
    }
    
})();
