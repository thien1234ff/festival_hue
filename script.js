// Loading Screen
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
            }, 2500);
        });

        // Typing Effect
        const typingTexts = [
            "Trải nghiệm văn hóa cung đình Huế",
            "Khám phá ẩm thực đặc sắc",
            "Tham quan làng nghề truyền thống",
            "Thưởng thức nghệ thuật dân gian"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingElement = document.getElementById('typingText');
        
        function typeWriter() {
            const currentText = typingTexts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 60 : 120;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % typingTexts.length;
                typeSpeed = 800;
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        // Start typing effect after page load
        setTimeout(typeWriter, 3500);

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header Scroll Effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Active Navigation Link
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });

        // Scroll Animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.section-title, .section-subtitle, .card, .stat-item, .footer-section').forEach(el => {
            observer.observe(el);
        });

        // Counter Animation
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'));
            const increment = target / 120;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 25);
        }

        // Trigger counter animation when stats section is visible
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Back to Top Button
        const backToTopBtn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Card Stagger Animation
        const cardObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 250);
                    });
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.card-grid').forEach(grid => {
            cardObserver.observe(grid);
        });

        // Cuisine Section Animations
        const cuisineObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cuisineCards = entry.target.querySelectorAll('.cuisine-card');
                    const featureItems = entry.target.querySelectorAll('.feature-item');
            
                    cuisineCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 200);
                    });
            
                    featureItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, (cuisineCards.length * 200) + (index * 150));
                    });
            
                    cuisineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        const cuisineSection = document.querySelector('#cuisine');
        if (cuisineSection) {
            cuisineObserver.observe(cuisineSection);
        }

        // Enhanced hover effects
        document.querySelectorAll('.card, .cuisine-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-25px) scale(1.03)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Video controls
        document.querySelectorAll('.cuisine-video video').forEach(video => {
            video.addEventListener('mouseenter', function() {
                this.playbackRate = 1.2;
            });
            
            video.addEventListener('mouseleave', function() {
                this.playbackRate = 1;
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add smooth reveal animation for sections
        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 0.8s ease';
            revealObserver.observe(section);
        });
        // Slider Cuisine
    let nextBtn = document.querySelector('.next');
    let prevBtn = document.querySelector('.prev');

    function setFadeForActiveSlide() {
        document.querySelectorAll('.item .bg').forEach(bg => bg.classList.remove('fade'));
        let mainBg = document.querySelector('.slide .item:nth-child(2) .bg');
        if (mainBg) {
            mainBg.classList.add('fade');
        }
    }

    setFadeForActiveSlide();

    nextBtn.addEventListener('click', function(){
        let items = document.querySelectorAll('.item');
        document.querySelector('.slide').appendChild(items[0]);
        setFadeForActiveSlide();
    });

    prevBtn.addEventListener('click', function(){
        let items = document.querySelectorAll('.item');
        document.querySelector('.slide').prepend(items[items.length - 1]);
        setFadeForActiveSlide();
    });
    document.getElementById('homeLink').addEventListener('click', function(e) {
    e.preventDefault(); // Ngăn mặc định nhảy tới #
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    });
    const craftData = {
    'non-la': {
        title: 'Nón Lá Huế Phú Cam',
        image: '/picture/non-la.jpg',
        description: 'Nón lá Huế không chỉ là một sản phẩm thủ công mà còn là biểu tượng văn hóa đặc trưng của người dân xứ Huế. Được làm từ lá cọ non và khung tre, nón lá Huế có độ bền cao và thiết kế tinh xảo.',
        history: 'Hình thành từ thế kỷ 17 bởi cộng đồng giáo dân định cư tại vùng đất Phú Cam.',
        technique: 'Sử dụng lá cọ non, khung tre, kỹ thuật đan lát truyền thống',
        products: 'Nón lá thường, nón lá thơ, nón lá trang trí'
    },
    'gom-phuoc-tich': {
        title: 'Làng Gốm Phước Tích',
        image: '/picture/gom.jpg',
        description: 'Làng gốm Phước Tích nổi tiếng với những sản phẩm gốm có chất lượng cao, được nung ở nhiệt độ cao tạo nên độ bền và vẻ đẹp độc đáo. Sản phẩm gốm Phước Tích mang đậm hồn quê xứ Huế.',
        history: 'Hơn 500 năm lịch sử, Trải qua 500 năm lịch sử, Phước Tích đã trở thành một điểm nổi bật với nghề gốm, sau đó được vua Gia Long đặt tên và phát triển',
        technique: 'Kỹ thuật nung gốm truyền thống, sử dụng lò nung củi',
        products: 'Chậu cảnh, bình hoa, đồ trang trí, gạch ngói'
    },
    'theu-hue': {
        title: 'Thêu Huế',
        image: '/picture/theu.jpg',
        description: 'Nghệ thuật thêu Huế là một trong những loại hình thủ công mỹ nghệ tinh xảo nhất của Việt Nam, với những họa tiết trang nhã, màu sắc hài hòa và kỹ thuật thêu độc đáo.',
        history: 'Hơn 300 năm lịch sử, phát triển trong cung đình nhà Nguyễn',
        technique: 'Thêu tay truyền thống, sử dụng chỉ lụa cao cấp',
        products: 'Áo dài, tranh thêu, túi xách, khăn trang trí'
    },
    
};

// DOM Elements
const filterBtns = document.querySelectorAll('.filter-btn');
const craftCards = document.querySelectorAll('.craft-card');
const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
const modal = document.getElementById('craftModal');
const closeBtn = document.querySelector('.close');
const statNumbers = document.querySelectorAll('.stat-number');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeFilters();
    initializeModal();
    initializeCounters();
});

// Animation Observer
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.section-title, .section-subtitle, .title-decoration, .craft-card, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // Stagger animation for cards
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.craft-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, index * 200);
                });
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const craftsGrid = document.querySelector('.crafts-grid');
    if (craftsGrid) {
        cardObserver.observe(craftsGrid);
    }
}

// Filter functionality
function initializeFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards with animation
            craftCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.classList.add('animate');
                    }, index * 100);
                } else {
                    card.classList.remove('animate');
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Modal functionality
function initializeModal() {
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const craftId = this.getAttribute('data-craft');
            const craft = craftData[craftId];
            
            if (craft) {
                document.getElementById('modalTitle').textContent = craft.title;
                document.getElementById('modalImage').src = craft.image;
                document.getElementById('modalImage').alt = craft.title;
                document.getElementById('modalDescription').textContent = craft.description;
                document.getElementById('modalHistory').textContent = craft.history;
                document.getElementById('modalTechnique').textContent = craft.technique;
                document.getElementById('modalProducts').textContent = craft.products;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Counter animation
function initializeCounters() {
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / 120;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 25);
    }

    // Trigger counter animation when statistics section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number[data-target]');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    const statsSection = document.querySelector('.crafts-statistics');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Enhanced hover effects
craftCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for background elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.crafts::before');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Script for talkbot
const sectionDialogues = [
    ["Hành Trình Qua Cố Đô: Festival Huế 2025."],
    [ 
        "Dưới ánh hoàng hôn dịu dàng, dòng sông Hương lấp lánh như dải lụa, thì thầm kể những câu chuyện ngàn năm của cố đô Huế.",
        "Bạn bước đi trên con đường nhỏ dẫn vào Festival Huế 2025, nơi mỗi góc phố, mỗi âm thanh, mỗi hương vị đều là một chương trong cuốn sách văn hóa rực rỡ."
    ],
    [
        "Chương đầu tiên mở ra tại làng nón Phú Cam, nơi những nghệ nhân khéo léo dệt từng chiếc lá cọ thành những chiếc nón lá tinh xảo.",
        "Dưới bàn tay họ, mỗi chiếc nón là một tác phẩm nghệ thuật, mang hồn Huế với những đường thêu mềm mại như thơ.",
        "Bạn cầm trên tay chiếc nón, cảm nhận được hơi thở của hơn 400 năm truyền thống, như thể thời gian đang kể bạn nghe về sự kiên trì và tinh tế.",
        "Bước tiếp theo, bạn lạc vào làng hoa giấy Thanh Tiên, nơi những bông hoa giấy rực rỡ sắc màu như nở ra từ tâm hồn của đất trời Huế.",
        "Mỗi cánh hoa được cắt tỉa thủ công, kể câu chuyện về những lễ hội tưng bừng, những ngày cưới hỏi ngập tràn niềm vui.",
        "Bạn mỉm cười, tưởng tượng mình đang đứng giữa một khu vườn hoa giấy lộng lẫy, nơi mọi khoảnh khắc đều trở nên bất tử."
    ],
    [
        "Hành trình dẫn bạn đến một góc phố nhỏ, nơi mùi hương cay nồng của bún bò Huế quyện trong không khí.",
        "Bạn ngồi xuống, thưởng thức tô bún với nước dùng đậm đà, thơm lừng từ xương heo, tôm khô và mắm ruốc. Mỗi muỗng nước là một câu chuyện về cung đình, nơi ẩm thực không chỉ là món ăn mà còn là nghệ thuật.",
        "Rồi bạn nếm thử nem công chả phụng, món ăn tinh tế của hoàng gia, với hương vị thanh đạm như một lời thì thầm của sự sang trọng.",
        "Không thể bỏ qua bánh ép làng Chuồn, giòn tan, đậm đà, như một khúc ca dân dã của làng quê Huế.",
        "Và để kết thúc, một miếng mè xửng ngọt ngào tan trên đầu lưỡi, mang theo hương vị cổ điển, như một lời chào tạm biệt từ những ngày xưa cũ."
    ],
    [
        "Cuối cùng, bạn dừng chân bên dòng sông Hương, nơi giai điệu nhã nhạc cung đình Huế vang lên, trầm bổng và trang nghiêm, như đưa bạn trở về thời hoàng kim của triều Nguyễn.",
        "Âm nhạc là linh hồn của Huế, được UNESCO vinh danh, kể về sự tinh tế của một vương triều.",
        "Rồi ca Huế cất lên, da diết và thơ mộng, như một bức thư tình gửi từ trái tim của người dân Huế.",
        "Bạn nhắm mắt, để những giai điệu ấy dẫn bạn qua những cung đường đầy hoa phượng vĩ, nơi quá khứ và hiện tại hòa quyện."
    ],
    [
        "Festival Huế 2025 khép lại, nhưng câu chuyện về cố đô vẫn còn vang vọng.",
        "Bạn rời đi, mang theo những mảnh ghép của văn hóa Huế – từ những chiếc nón lá, những món ăn đậm đà, đến những giai điệu bất tử.",
        "Và đâu đó, bạn biết rằng Huế vẫn đang chờ bạn quay lại, để tiếp tục kể những câu chuyện mới."
    ],
    [
        "Cảm ơn các bạn đã dành thời gian để lắng nghe.",
        "Câu chuyện sẽ được kể lại sau 10 giây tiếp theo."
    ]
];

let currentSection = 0;
let currentDialogue = 0;
let currentTimeoutId = null;
let isAutoMode = true;


function showCharacter() {
    document.getElementById("character").classList.add("show");
    document.getElementById("speech").classList.add("show");
}

function hideCharacter() {
    document.getElementById("character").classList.remove("show");
    document.getElementById("speech").classList.remove("show");
}


function moveCharacterWithSpeech(text) {
    const character = document.getElementById("character");
    const speech = document.getElementById("speech");

    const maxX = window.innerWidth * 0.9;
    const newX = Math.random() * maxX;
    const vwX = (newX / window.innerWidth) * 100;

    // moveCharacterToCurrentSection();

    // Tránh đặt left ngay lập tức — dùng requestAnimationFrame để đảm bảo repaint
    requestAnimationFrame(() => {
    character.style.left = (vwX + 3.4) + "vw";
    speech.style.left = vwX + "vw";

    speech.classList.remove("show");
    setTimeout(() => {
        speech.classList.add("show");
        typeWriter(speech, text);
    }, 300);
    });

    // Trả về thời gian cần để nói xong
    const typingTime = text.length * 28 + 1000;
    return typingTime;
}


function typeWriter(element, text, speed = 28) {
    element.innerHTML = "";
    const span = document.createElement("span");
    element.appendChild(span);

    const cloud = document.createElement("span");
    cloud.className = "cloud-extra";
    element.appendChild(cloud);

    let i = 0;
    function type() {
    if (i < text.length) {
        span.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
    }
    }
    type();
}

function runDialogueForSection(sectionIndex) {
    const dialogues = sectionDialogues[sectionIndex];
    if (!dialogues) return;

    currentDialogue = 0;

    function nextDialogue() {
        if (currentDialogue >= dialogues.length) {
            currentSection++;
            if (currentSection < sectionDialogues.length) {
                // fullpage_api.moveSectionDown();
                currentTimeoutId = setTimeout(() => {
                    runDialogueForSection(currentSection);
                }, 1000);
            } else {
                hideCharacter();
                window.dispatchEvent(new CustomEvent("HuyModeKC"));

                // Sau 10 giây nhân vật xuất hiện lại và kể lại từ đầu
                setTimeout(() => {
                    resetStory();
                    startCharacterLoop();
                }, 10000);
            }
            return;
        }

        const text = dialogues[currentDialogue++];
        const delay = moveCharacterWithSpeech(text) + 1000;

        currentTimeoutId = setTimeout(nextDialogue, delay);
    }

    nextDialogue();
}

function startCharacterLoop() {
    // isAutoMode = true;
    showCharacter();
    runDialogueForSection(currentSection);
}


function resetStory() {
    currentSection = 0;
    currentDialogue = 0;
    // isAutoMode = true;
    if (currentTimeoutId) {
    clearTimeout(currentTimeoutId);
    currentTimeoutId = null;
    }
}

window.resetStory = resetStory;
window.startCharacterLoop = startCharacterLoop;
window.hideCharacter = hideCharacter;

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Function chính cho việc bật tắt chế độ kể chuyện
document.addEventListener('DOMContentLoaded', function () {
    const event = new CustomEvent("KichHoatModeKC", {});
    window.dispatchEvent(event);
});

//Talkbot
// Khi bật chế độ kể chuyện
window.addEventListener("KichHoatModeKC", () => {
    if (window.resetStory) {
        window.resetStory();
    }
    if (window.startCharacterLoop) {
        setTimeout(() => {
        window.startCharacterLoop();
        }, 200);
    }
});
