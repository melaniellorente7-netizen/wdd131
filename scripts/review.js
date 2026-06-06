  document.addEventListener("DOMContentLoaded", () => {
            let reviewCount = localStorage.getItem("reviewCount");
            
            if (reviewCount === null) {
                reviewCount = 0;
            } else {
                reviewCount = parseInt(reviewCount);
            }
            reviewCount++;
            localStorage.setItem("reviewCount", reviewCount);
            document.getElementById("review-counter").textContent = reviewCount;
        });