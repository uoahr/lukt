$(document).ready(function () {
    const wrappers = document.querySelectorAll('.recipe-container .video-wrapper');
    const filterButtons = document.querySelectorAll('.recipe-filter-menu button');

    // [추가] 초기 로드 시에도 1-2-3 순서대로 지연 시간을 미리 할당합니다.
    wrappers.forEach((wrapper, index) => {
        const delay = (index % 3) * 0.3;
        wrapper.style.transitionDelay = `${delay}s`;
    });

    // 필터링 시 순차적 애니메이션 재적용 함수
    function applySequentialAnimation(filter) {
        let visibleIndex = 0; 

        wrappers.forEach((wrapper) => {
            const category = wrapper.getAttribute('data-category');

            if (filter === '전체' || filter === category) {
                wrapper.style.display = 'block';
                wrapper.classList.remove('reveal');
                
                // 보이는 카드 기준으로 지연 시간 다시 계산
                const delay = (visibleIndex % 3) * 0.3; 
                wrapper.style.transitionDelay = `${delay}s`;
                
                setTimeout(() => {
                    wrapper.classList.add('reveal');
                }, 50);

                visibleIndex++; 
            } else {
                wrapper.style.display = 'none';
                wrapper.classList.remove('reveal');
                wrapper.style.transitionDelay = '0s';
                
                const video = wrapper.querySelector('video');
                video.pause();
                video.classList.remove('is-playing');
            }
        });
    }

    // 1. 카테고리 필터링 버튼 이벤트
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.textContent.trim();
            applySequentialAnimation(filter);
        });
    });

    // 2. 비디오 재생/일시정지 (이어보기)
    wrappers.forEach(wrapper => {
        const video = wrapper.querySelector('video');

        wrapper.addEventListener('click', function () {
            if (video.paused) {
                document.querySelectorAll('video').forEach(v => {
                    v.pause();
                    v.classList.remove('is-playing');
                });
                video.play();
                video.classList.add('is-playing');
            } else {
                video.pause();
                video.classList.remove('is-playing');
            }
        });
    });

    // 3. 스크롤 시 사르르 나타나는 효과
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 이미 위에서 할당한 transitionDelay를 사용해 사르르 나타납니다.
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    wrappers.forEach(wrapper => {
        observer.observe(wrapper);
    });

    if(filterButtons[0]) filterButtons[0].classList.add('active');
});