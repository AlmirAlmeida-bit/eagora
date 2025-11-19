// LOADING - ESTILO HQ DINÂMICO
(function() {
    // Aguardar DOM estar pronto
    function initLoading() {
        const loading = document.getElementById('hq-loading');
        
        if (!loading) return;
        
        const panels = loading.querySelectorAll('.hq-panel');
        let currentPanel = 0;
        
        // Função para remover o loading
        const skipLoading = function() {
            if (loading && !loading.classList.contains('hidden')) {
                loading.classList.add('hidden');
                setTimeout(function() {
                    if (loading && loading.parentNode) {
                        loading.parentNode.removeChild(loading);
                    }
                }, 500);
            }
        };
        
        // Função para mostrar próximo painel
        const showNextPanel = function() {
            if (currentPanel < panels.length) {
                // Remover classe active do painel anterior
                if (currentPanel > 0) {
                    panels[currentPanel - 1].classList.remove('active');
                }
                
                // Adicionar classe active ao painel atual
                panels[currentPanel].classList.add('active');
                currentPanel++;
                
                // Se não for o último painel, agendar próximo
                if (currentPanel < panels.length) {
                    setTimeout(showNextPanel, 3000); // 3 segundos por painel
                }
            }
        };
        
        // Mostrar primeiro painel após pequeno delay
        setTimeout(function() {
            if (panels.length > 0) {
                showNextPanel();
            }
        }, 500);
        
        // Botão do logo para pular/acessar
        const logoButton = document.getElementById('hq-loading-button');
        if (logoButton) {
            logoButton.addEventListener('click', skipLoading);
            logoButton.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    skipLoading();
                }
            });
        }
        
        // Permitir pular qualquer painel com clique (exceto no último que tem o botão)
        panels.forEach(function(panel, index) {
            if (index < panels.length - 1) { // Não adicionar no último painel
                panel.addEventListener('click', function() {
                    // Mostrar todos os painéis anteriores e o atual
                    for (let i = 0; i <= index; i++) {
                        panels[i].classList.add('active');
                    }
                    currentPanel = index + 1;
                    if (currentPanel < panels.length) {
                        clearTimeout();
                        setTimeout(showNextPanel, 500);
                    }
                });
            }
        });
        
        // Permitir pular com teclas (espaço, enter, escape)
        const keyHandler = function(e) {
            if ((e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') && loading && !loading.classList.contains('hidden')) {
                e.preventDefault();
                // Se estiver no último painel, remover loading
                if (currentPanel >= panels.length) {
                    skipLoading();
                    document.removeEventListener('keydown', keyHandler);
                } else {
                    // Pular para o próximo painel
                    for (let i = 0; i < currentPanel; i++) {
                        panels[i].classList.remove('active');
                    }
                    if (currentPanel < panels.length) {
                        panels[currentPanel].classList.add('active');
                        currentPanel++;
                        if (currentPanel < panels.length) {
                            clearTimeout();
                            setTimeout(showNextPanel, 500);
                        }
                    }
                }
            }
        };
        
        document.addEventListener('keydown', keyHandler);
    }
    
    // Executar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoading);
    } else {
        initLoading();
    }
})();

// GARANTIR QUE A PÁGINA COMECE NO TOPO - EXECUTAR IMEDIATAMENTE
(function() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Também garantir quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });
    } else {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }
})();

// CONFIGURAR HEADER IMEDIATAMENTE - MÚLTIPLAS TENTATIVAS
function fixMobileHeader() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        const headerWrapper = document.querySelector('.header-wrapper-mobile');
        const header = document.querySelector('.header-wrapper-mobile .hq-header');
        
        if (headerWrapper && header) {
            // Container isolado - forçar fixo e isolado, SEM SCROLL HORIZONTAL
            headerWrapper.style.setProperty('position', 'fixed', 'important');
            headerWrapper.style.setProperty('top', '0', 'important');
            headerWrapper.style.setProperty('left', '0', 'important');
            headerWrapper.style.setProperty('right', '0', 'important');
            headerWrapper.style.setProperty('width', '100%', 'important');
            headerWrapper.style.setProperty('max-width', '100%', 'important');
            headerWrapper.style.setProperty('z-index', '1000', 'important');
            headerWrapper.style.setProperty('pointer-events', 'none', 'important');
            headerWrapper.style.setProperty('transform', 'translateZ(0)', 'important');
            headerWrapper.style.setProperty('-webkit-transform', 'translateZ(0)', 'important');
            headerWrapper.style.setProperty('isolation', 'isolate', 'important');
            headerWrapper.style.setProperty('overflow-x', 'hidden', 'important');
            headerWrapper.style.setProperty('margin', '0', 'important');
            headerWrapper.style.setProperty('padding', '0', 'important');
            
            // Header dentro do container - CENTRALIZADO
            header.style.setProperty('position', 'relative', 'important');
            header.style.setProperty('left', '0', 'important');
            header.style.setProperty('right', '0', 'important');
            header.style.setProperty('width', '100%', 'important');
            header.style.setProperty('max-width', '100%', 'important');
            header.style.setProperty('margin', '0 auto', 'important');
            header.style.setProperty('text-align', 'center', 'important');
            header.style.setProperty('pointer-events', 'auto', 'important');
            header.style.setProperty('opacity', '1', 'important');
            header.style.setProperty('visibility', 'visible', 'important');
            header.style.setProperty('display', 'block', 'important');
            header.style.setProperty('overflow-x', 'hidden', 'important');
            
            // Elementos internos também
            const logo = header.querySelector('.header-logo');
            const h1 = header.querySelector('h1');
            
            if (logo) {
                logo.style.setProperty('opacity', '1', 'important');
                logo.style.setProperty('visibility', 'visible', 'important');
            }
            if (h1) {
                h1.style.setProperty('opacity', '1', 'important');
                h1.style.setProperty('visibility', 'visible', 'important');
            }
            
            return true;
        }
    }
    return false;
}

// Tentar imediatamente
if (document.readyState === 'loading') {
    // DOM ainda carregando, tentar quando estiver pronto
    document.addEventListener('DOMContentLoaded', fixMobileHeader);
} else {
    // DOM já carregado
    fixMobileHeader();
}

// Tentar também após um pequeno delay para garantir
setTimeout(fixMobileHeader, 10);
setTimeout(fixMobileHeader, 50);
setTimeout(fixMobileHeader, 100);

// Aguardar o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // GARANTIR QUE A PÁGINA COMECE NO TOPO
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // CONFIGURAR HEADER PRIMEIRO - ANTES DE QUALQUER OUTRA COISA
    fixMobileHeader();
    
    // Registrar o plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll('.story-section');
    const isMobile = window.innerWidth <= 768;
    const screenWidth = window.innerWidth;
    
    // Calcular altura do header para centralização correta (uma vez só)
    // Desktop usa .hq-header-desktop, mobile usa header dentro do container isolado
    const header = isMobile 
        ? document.querySelector('.header-wrapper-mobile .hq-header')
        : document.querySelector('.hq-header-desktop');
    
    // GARANTIR HEADER COMPLETAMENTE ESTÁTICO - SEM INTERAÇÃO COM SCROLL
    // NO MOBILE: usar container isolado
    if (isMobile) {
        const headerWrapper = document.querySelector('.header-wrapper-mobile');
        const mobileHeader = document.querySelector('.header-wrapper-mobile .hq-header');
        if (headerWrapper && mobileHeader) {
            // Container isolado - completamente fixo, SEM SCROLL HORIZONTAL
            headerWrapper.style.setProperty('position', 'fixed', 'important');
            headerWrapper.style.setProperty('top', '0', 'important');
            headerWrapper.style.setProperty('left', '0', 'important');
            headerWrapper.style.setProperty('right', '0', 'important');
            headerWrapper.style.setProperty('width', '100%', 'important');
            headerWrapper.style.setProperty('max-width', '100%', 'important');
            headerWrapper.style.setProperty('z-index', '1000', 'important');
            headerWrapper.style.setProperty('pointer-events', 'none', 'important');
            headerWrapper.style.setProperty('transform', 'translateZ(0)', 'important');
            headerWrapper.style.setProperty('-webkit-transform', 'translateZ(0)', 'important');
            headerWrapper.style.setProperty('isolation', 'isolate', 'important');
            headerWrapper.style.setProperty('overflow-x', 'hidden', 'important');
            headerWrapper.style.setProperty('margin', '0', 'important');
            headerWrapper.style.setProperty('padding', '0', 'important');
            
            // Header dentro do container - CENTRALIZADO
            mobileHeader.style.setProperty('position', 'relative', 'important');
            mobileHeader.style.setProperty('left', '0', 'important');
            mobileHeader.style.setProperty('right', '0', 'important');
            mobileHeader.style.setProperty('width', '100%', 'important');
            mobileHeader.style.setProperty('max-width', '100%', 'important');
            mobileHeader.style.setProperty('margin', '0 auto', 'important');
            mobileHeader.style.setProperty('text-align', 'center', 'important');
            mobileHeader.style.setProperty('pointer-events', 'auto', 'important');
            // Opacity será controlada pela animação de fade
            mobileHeader.style.setProperty('visibility', 'visible', 'important');
            mobileHeader.style.setProperty('overflow-x', 'hidden', 'important');
            
            // Proteger container e header contra ScrollTrigger
            headerWrapper.setAttribute('data-scroll', 'ignore');
            headerWrapper.setAttribute('data-scroll-section', 'ignore');
            mobileHeader.setAttribute('data-scroll', 'ignore');
            mobileHeader.setAttribute('data-scroll-section', 'ignore');
            
            // Matar qualquer trigger relacionado
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === headerWrapper || trigger.trigger === mobileHeader) {
                    trigger.kill();
                }
            });
        }
    } else {
        // Desktop: configuração normal
        const desktopHeader = document.querySelector('.hq-header-desktop');
        if (desktopHeader) {
            desktopHeader.style.setProperty('position', 'fixed', 'important');
            desktopHeader.style.setProperty('top', '0', 'important');
            desktopHeader.style.setProperty('left', '0', 'important');
            desktopHeader.style.setProperty('right', '0', 'important');
            desktopHeader.style.setProperty('width', '100%', 'important');
            desktopHeader.style.setProperty('z-index', '100', 'important');
            // Opacity será controlada pela animação de fade
            desktopHeader.style.setProperty('visibility', 'visible', 'important');
            desktopHeader.style.setProperty('display', 'block', 'important');
            desktopHeader.style.setProperty('transform', 'translateZ(0)', 'important');
            desktopHeader.style.setProperty('-webkit-transform', 'translateZ(0)', 'important');
            
            desktopHeader.setAttribute('data-scroll', 'ignore');
            desktopHeader.setAttribute('data-scroll-section', 'ignore');
            
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === desktopHeader) {
                    trigger.kill();
                }
            });
        }
    }
    
    // Usar o header correto para calcular altura
    const headerForHeight = isMobile 
        ? document.querySelector('.header-wrapper-mobile .hq-header')
        : document.querySelector('.hq-header-desktop');
    const headerHeight = headerForHeight ? headerForHeight.offsetHeight : 100;
    // Centralizar considerando a parte de baixo do header como referência
    const centerOffset = headerHeight; // Altura completa do header para centralizar abaixo dele
    
    // PRIMEIRO: Garantir que o primeiro slide esteja completamente invisível e fora da cena
    if (sections.length > 0) {
        const firstSection = sections[0];
        const firstPanel = firstSection ? firstSection.querySelector('.panel') : null;
        const firstIcon = firstSection ? firstSection.querySelector('.panel-icon') : null;
        const firstDialogue = firstSection ? firstSection.querySelector('.dialogue') : null;
        const firstImage = firstSection ? firstSection.querySelector('.panel-visual-img') : null;
        const firstTextFrame = firstSection ? firstSection.querySelector('.panel-text-frame') : null;
        
        // Ocultar completamente o primeiro slide ANTES de qualquer coisa
        if (firstSection) {
            gsap.set(firstSection, { opacity: 0, visibility: "hidden" });
        }
        if (firstPanel) {
            gsap.set(firstPanel, { 
                opacity: 0,
                visibility: "hidden",
                y: -2000, // Mover completamente fora da cena
                zIndex: -1000
            });
        }
        if (firstIcon) {
            gsap.set(firstIcon, { 
                opacity: 0, 
                visibility: "hidden",
                scale: 0.5, 
                y: -2000 
            });
        }
        if (firstDialogue) {
            gsap.set(firstDialogue, { 
                opacity: 0, 
                visibility: "hidden",
                y: -2000 
            });
        }
        if (firstImage) {
            gsap.set(firstImage, {
                opacity: 0,
                visibility: "hidden",
                scale: 0.3,
                y: -2000,
                rotation: -8
            });
        }
        if (firstTextFrame) {
            gsap.set(firstTextFrame, {
                opacity: 0,
                visibility: "hidden",
                scale: 0.5,
                y: -2000,
                x: 50
            });
        }
    }
    
    // ANIMAÇÃO DE FADE DOS ELEMENTOS DO HEADER (LOGO, H1)
    const headerForFade = isMobile 
        ? document.querySelector('.header-wrapper-mobile .hq-header')
        : document.querySelector('.hq-header-desktop');
    
    if (headerForFade) {
        // Selecionar os elementos específicos
        const logo = headerForFade.querySelector('.header-logo');
        const h1 = headerForFade.querySelector('h1');
        
        // Estado inicial - todos invisíveis
        if (logo) gsap.set(logo, { opacity: 0 });
        if (h1) gsap.set(h1, { opacity: 0 });
        
        // Fade dos elementos do header - aparece primeiro
        const headerFadeTL = gsap.timeline({
            delay: 0.2, // Pequeno delay inicial
            onComplete: () => {
                // Após todos os elementos do header terminarem o fade, iniciar a animação do primeiro slide
                startFirstSlideAnimation();
            }
        });
        
        // Logo aparece primeiro - easing suave e natural
        if (logo) {
            headerFadeTL.to(logo, {
                opacity: 1, 
                duration: isMobile ? 0.7 : 0.9,
                ease: "power3.out" 
            }, 0);
        }
        
        // H1 aparece logo após o logo - easing mais dramático
        if (h1) {
            headerFadeTL.to(h1, {
                opacity: 1,
                duration: isMobile ? 0.9 : 1.1,
                ease: "power2.out"
            }, isMobile ? 0.2 : 0.25);
        }
    } else {
        // Se não encontrar o header, iniciar o slide imediatamente
        startFirstSlideAnimation();
    }
    
    // Função para iniciar a animação do primeiro slide (SÓ EXECUTA APÓS O HEADER)
    function startFirstSlideAnimation() {
    
    // Primeiro slide - fade com todos os elementos
    if (sections.length > 0) {
        const firstSection = sections[0];
        const firstPanel = firstSection ? firstSection.querySelector('.panel') : null;
        const firstIcon = firstSection ? firstSection.querySelector('.panel-icon') : null;
        const firstDialogue = firstSection ? firstSection.querySelector('.dialogue') : null;
        const firstImage = firstSection ? firstSection.querySelector('.panel-visual-img') : null;
        const firstTextFrame = firstSection ? firstSection.querySelector('.panel-text-frame') : null;
        
        if (firstPanel && firstSection) {
            // Tornar a seção visível agora
            gsap.set(firstSection, { opacity: 1, visibility: "visible" });
            
            // Calcular posição inicial (atrás do header) - negativo para começar acima
            const initialY = -(headerHeight + (isMobile ? 50 : 100));
            
            // Estado inicial do primeiro slide - começa atrás do header
            gsap.set(firstPanel, { 
                opacity: 0,
                y: initialY,
                visibility: "visible",
                zIndex: 10 // Menor que o header (100/1000) para passar por trás
            });
            if (firstIcon) gsap.set(firstIcon, { 
                opacity: 0, 
                visibility: "visible",
                scale: 0.5, 
                y: initialY + (isMobile ? 10 : 20) 
            });
            if (firstDialogue) gsap.set(firstDialogue, { 
                opacity: 0, 
                visibility: "visible",
                y: initialY + (isMobile ? 15 : 30) 
            });
            if (firstImage) gsap.set(firstImage, {
                opacity: 0,
                visibility: "visible",
                scale: 0.4,
                y: initialY + (isMobile ? 20 : 40),
                rotation: -6
            });
            if (firstTextFrame) gsap.set(firstTextFrame, {
                opacity: 0,
                visibility: "visible",
                scale: 0.8,
                y: initialY + (isMobile ? 25 : 50),
                x: 30
            });
            
            // Variável global para armazenar o ScrollTrigger do primeiro slide
            window.firstSlideTrigger = null;
            
            // Animação inicial de "queda" ao carregar a página
            // Usar requestAnimationFrame para garantir que execute após o layout
            requestAnimationFrame(() => {
                setTimeout(() => {
                    const initialFallTL = gsap.timeline({
                        onComplete: () => {
                    // Após a queda, resetar z-index para permitir scroll normal
                    gsap.set(firstPanel, { zIndex: "auto" });
                    
                    // Agora criar o ScrollTrigger do primeiro slide (após a animação inicial)
                    const scrollTL = gsap.timeline();
                    scrollTL.to(firstPanel, {
                        opacity: 1, 
                        y: 0,
                        duration: isMobile ? 1 : 1.2,
                        ease: "power2.inOut"
                    }, 0);
                    
                    if (firstIcon) {
                        scrollTL.to(firstIcon, {
                opacity: 1, 
                            scale: 1,
                            y: 0,
                            duration: isMobile ? 0.7 : 0.9,
                            ease: "sine.inOut"
                        }, isMobile ? 0.2 : 0.25);
                    }
                    
                    if (firstDialogue) {
                        scrollTL.to(firstDialogue, {
                opacity: 1, 
                            y: 0,
                            duration: isMobile ? 0.7 : 0.9,
                            ease: "power1.inOut"
                        }, isMobile ? 0.15 : 0.2);
                    }
                    
                    if (firstImage) {
                        scrollTL.to(firstImage, {
                            opacity: 1,
                            scale: 1,
                            rotation: 0,
                            y: 0,
                            duration: isMobile ? 0.8 : 1,
                            ease: "elastic.out(1, 0.5)"
                        }, isMobile ? 0.1 : 0.15);
                    }
                    
                    if (firstTextFrame) {
                        scrollTL.to(firstTextFrame, {
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            y: 0,
                            duration: isMobile ? 0.8 : 1,
                            ease: "elastic.out(1, 0.5)"
                        }, isMobile ? 0.12 : 0.18);
                    }
                    
                    // NO MOBILE: O trigger do slide 1 deve terminar ANTES do slide 2 começar
                    // Slide 2 começa em "top 80%", então slide 1 deve terminar em "top 75%"
                    window.firstSlideTrigger = ScrollTrigger.create({
                        trigger: firstSection,
                        start: isMobile ? "top 98%" : "top 90%",
                        end: isMobile ? "top 75%" : () => `top+=${centerOffset}px center`, // No mobile, termina ANTES do slide 2 começar
                        scrub: isMobile ? 0.3 : 0.5,
                        markers: false,
                        animation: scrollTL,
                        invalidateOnRefresh: true,
                        preventOverlaps: true,
                        // NO MOBILE: Matar o trigger quando sair completamente
                        onLeave: () => {
                            if (window.firstSlideTrigger && isMobile) {
                                window.firstSlideTrigger.kill();
                                window.firstSlideTrigger = null;
                            }
                        }
                    });
                }
            });
            
            // Painel cai e aparece - easing melhorado e mais rápido
            initialFallTL.fromTo(firstPanel, 
                { y: initialY, opacity: 0, zIndex: 10 },
                {
                    y: 0,
                    opacity: 1,
                    duration: isMobile ? 0.8 : 1.0,
                    ease: isMobile ? "power4.out" : "expo.out"
                }, 
                0
            );
            
            // Ícone aparece durante a queda - com bounce mais pronunciado
            if (firstIcon) {
                initialFallTL.fromTo(firstIcon,
                    { opacity: 0, scale: 0.5, y: initialY + (isMobile ? 10 : 20) },
                {
                    opacity: 1,
                    scale: 1,
                        y: 0,
                        duration: isMobile ? 0.7 : 0.85,
                        ease: isMobile ? "back.out(1.5)" : "back.out(1.8)"
                    },
                    isMobile ? 0.3 : 0.4
                );
            }
            
            // Diálogo aparece durante a queda - easing suave e natural
            if (firstDialogue) {
                initialFallTL.fromTo(firstDialogue,
                    { opacity: 0, y: initialY + (isMobile ? 15 : 30) },
                {
                    opacity: 1,
                    y: 0,
                    duration: isMobile ? 0.7 : 0.85,
                    ease: "power3.out"
                },
                    isMobile ? 0.25 : 0.35
                );
            }
            
            if (firstImage) {
                initialFallTL.fromTo(firstImage,
                    { opacity: 0, scale: 0.4, y: initialY + (isMobile ? 20 : 40), rotation: -6 },
                    {
                        opacity: 1,
                        scale: 1.08,
                        rotation: 0,
                        y: 0,
                        duration: isMobile ? 0.75 : 0.9,
                        ease: "elastic.out(1, 0.5)"
                    },
                    isMobile ? 0.25 : 0.3
                ).to(firstImage, {
                    scale: 1,
                    duration: 0.15,
                    ease: "power3.out"
                }, ">-0.1");
            }
            
            // Texto aparece com efeito pipoca sincronizado
            if (firstTextFrame) {
                initialFallTL.fromTo(firstTextFrame,
                    { opacity: 0, scale: 0.8, y: initialY + (isMobile ? 25 : 50), x: 30 },
                    {
                        opacity: 1,
                        scale: 1.05,
                        y: 0,
                        x: 0,
                        duration: isMobile ? 0.75 : 0.9,
                        ease: "elastic.out(1, 0.55)"
                    },
                    isMobile ? 0.3 : 0.35
                ).to(firstTextFrame, {
                    scale: 1,
                    duration: 0.15,
                    ease: "power3.out"
                }, ">-0.1");
            }
                }, 100); // Delay de 100ms após requestAnimationFrame
            });
        }
    }
    } // Fim da função startFirstSlideAnimation
    
    // Animações para os slides seguintes - deslize esquerda/direita
    // NO MOBILE: Distância crescente e mais evidente para cada slide
    const baseSlideDistance = isMobile ? screenWidth * 0.7 : screenWidth * 1.2;
    
    sections.forEach((section, index) => {
        if (index === 0) return; // Pular o primeiro slide (já configurado acima)
        
        const panel = section.querySelector('.panel');
        const icon = section.querySelector('.panel-icon');
        const dialogue = section.querySelector('.dialogue');
        const image = section.querySelector('.panel-visual-img');
        const textFrame = section.querySelector('.panel-text-frame');
        
        // Definir direção do slide - intercalar
        const slideFromLeft = index % 2 === 1;
        
        // NO MOBILE: Distância crescente MUITO MAIS EVIDENTE para cada slide
        // Cada slide tem uma distância significativamente maior que o anterior
        let slideDistance;
        if (isMobile) {
            // Progressão mais agressiva: 0.7, 0.85, 1.0, 1.15, 1.3, etc.
            const multiplier = 0.7 + (index - 1) * 0.15;
            slideDistance = screenWidth * multiplier;
        } else {
            slideDistance = baseSlideDistance;
        }
        const fromX = slideFromLeft ? -slideDistance : slideDistance;
        
        // NO MOBILE: Rotação e escala crescem MUITO MAIS progressivamente
        const rotationAmount = isMobile ? (8 + (index - 1) * 3) : 0; // Aumenta 3 graus por slide (mais evidente)
        const scaleAmount = isMobile ? (0.85 - (index - 1) * 0.03) : 1; // Diminui 0.03 por slide (mais dramático)
        
        // Estado inicial - ajustado para mobile (com efeitos crescentes MUITO MAIS EVIDENTES)
        gsap.set(panel, { 
            x: fromX, 
            opacity: 0,
            rotation: isMobile ? (slideFromLeft ? -rotationAmount : rotationAmount) : 0,
            scale: isMobile ? scaleAmount : 1
        });
        if (icon) gsap.set(icon, { 
            opacity: 0, 
            scale: isMobile ? (0.3 + (index - 1) * 0.08) : 0.5, // Escala inicial cresce mais
            y: isMobile ? (15 + (index - 1) * 5) : 20 // Y inicial aumenta mais
        });
        if (dialogue) gsap.set(dialogue, { 
            opacity: 0, 
            y: isMobile ? (20 + (index - 1) * 6) : 30 // Y inicial aumenta mais
        });
        if (image) gsap.set(image, {
            opacity: 0,
            scale: 0.2,
            y: isMobile ? (35 + (index - 1) * 5) : 60,
            rotation: slideFromLeft ? -12 : 12,
            x: fromX * 0.4
        });
        if (textFrame) gsap.set(textFrame, {
            opacity: 0,
            scale: 0.8,
            y: isMobile ? (30 + (index - 1) * 5) : 50,
            x: slideFromLeft ? -30 : 30
        });
        
        // Timeline - centralizado considerando o header
        // NO MOBILE: Ajustar start e end para evitar sobreposição e loops
        // Para o slide 2 (index === 1), garantir que o slide 1 já terminou completamente
        const startValue = isMobile 
            ? (index === 1 ? "top 80%" : "top 98%") // Slide 2 começa DEPOIS que slide 1 terminou (75%)
            : "top 90%";
        
        // NO MOBILE: End deve ser mais curto e específico para evitar sobreposição
        const endValue = isMobile 
            ? (index === 1 ? "bottom top" : () => `top+=${centerOffset + (index * 100)}px center`)
            : () => `top+=${centerOffset}px center`;
        
        // NO MOBILE: Garantir que o trigger do slide 1 seja morto ANTES de criar o do slide 2
        if (isMobile && index === 1) {
            // Matar o trigger do slide 1 se ainda existir
            if (window.firstSlideTrigger) {
                window.firstSlideTrigger.kill();
                window.firstSlideTrigger = null;
            }
            // Matar TODOS os triggers do slide 1 (por segurança)
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === sections[0]) {
                    trigger.kill();
                }
            });
            // Refresh para garantir que as mudanças foram aplicadas
            ScrollTrigger.refresh();
        }
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: startValue,
                end: endValue,
                scrub: isMobile ? (index === 1 ? 0.3 : 0.5) : 0.6, // Slide 2 com scrub normal
                markers: false,
                invalidateOnRefresh: true,
                preventOverlaps: true,
                // NO MOBILE: Garantir que trigger anterior está morto quando este começar
                onEnter: () => {
                    if (isMobile && index === 1) {
                        // Garantir que o trigger do slide 1 está morto
                        if (window.firstSlideTrigger) {
                            window.firstSlideTrigger.kill();
                            window.firstSlideTrigger = null;
                        }
                        // Matar qualquer outro trigger do slide 1
                        ScrollTrigger.getAll().forEach(trigger => {
                            if (trigger.trigger === sections[0] && trigger !== tl.scrollTrigger) {
                                trigger.kill();
                            }
                        });
                    }
                },
                onLeaveBack: () => {
                    // Se voltar para o slide anterior, não fazer nada
                    // Isso evita loops ao voltar
                }
            }
        });
        
        // Painel desliza e aparece - mobile mais suave e evidente
        const panelDuration = isMobile ? (1.4 + (index - 1) * 0.15) : 1.0; // Mobile mais lento para ser mais evidente
        tl.to(panel, {
            x: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: panelDuration,
            ease: isMobile ? "power3.out" : "expo.out" // Mobile com easing mais suave
        }, 0);
        
        // Ícone aparece durante o deslize - mobile mais suave
        if (icon) {
            const iconStartTime = isMobile ? (0.3 + (index - 1) * 0.08) : 0.3;
            const iconBounce = isMobile ? (1.5 + (index - 1) * 0.12) : 1.5;
            tl.to(icon, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: isMobile ? (1.0 + (index - 1) * 0.1) : 0.85, // Mobile mais lento
                ease: isMobile ? `back.out(${iconBounce})` : "back.out(1.5)"
            }, iconStartTime);
        }
        
        // Diálogo aparece sincronizado - mobile mais suave
        if (dialogue) {
            const dialogueStartTime = isMobile ? (0.25 + (index - 1) * 0.08) : 0.25;
            tl.to(dialogue, {
                opacity: 1,
                y: 0,
                duration: isMobile ? (1.0 + (index - 1) * 0.1) : 0.85, // Mobile mais lento
                ease: isMobile ? "power2.out" : "power3.out" // Mobile com easing mais suave
            }, dialogueStartTime);
        }
        
        // Imagem aparece com efeito pipoca sincronizado - mobile mais suave e evidente
        if (image) {
            const imageStartTime = isMobile ? (0.35 + (index - 1) * 0.1) : 0.35;
            const imageBounce = isMobile ? 0.5 : 0.4; // Mobile com bounce mais suave
            tl.fromTo(image,
                { opacity: 0, scale: 0.2, y: isMobile ? (35 + (index - 1) * 5) : 60, rotation: slideFromLeft ? -12 : 12, x: fromX * 0.4 },
                {
                    opacity: 1,
                    scale: 1.2,
                    rotation: 0,
                    y: 0,
                    x: 0,
                    duration: isMobile ? (1.3 + (index - 1) * 0.12) : 1.2, // Mobile mais lento
                    ease: `elastic.out(1, ${imageBounce})`
                },
                imageStartTime
            ).to(image, {
                scale: 1,
                duration: isMobile ? 0.4 : 0.3, // Mobile mais lento no ajuste final
                ease: "power2.out"
            }, ">-0.15");
        }
        
        // Texto aparece com efeito pipoca sincronizado - mobile mais suave
        if (textFrame) {
            const textStartTime = isMobile ? (0.4 + (index - 1) * 0.1) : 0.4;
            const textBounce = isMobile ? 0.6 : 0.5; // Mobile com bounce mais suave
            tl.fromTo(textFrame,
                { opacity: 0, scale: 0.8, y: isMobile ? (30 + (index - 1) * 5) : 50, x: slideFromLeft ? -30 : 30 },
                {
                    opacity: 1,
                    scale: 1.05,
                    y: 0,
                    x: 0,
                    duration: isMobile ? (1.1 + (index - 1) * 0.1) : 1.0, // Mobile mais lento
                    ease: `elastic.out(1, ${textBounce})`
                },
                textStartTime
            ).to(textFrame, {
                scale: 1,
                duration: isMobile ? 0.25 : 0.15, // Mobile mais lento no ajuste final
                ease: "power2.out"
            }, ">-0.12");
        }
    });
    
    // ANIMAÇÃO ESPECIAL DO SLIDE 8 - EFEITO GELATINA CRESCENTE
    if (sections.length > 7) {
        const section8 = sections[7];
        const logoFinal = section8 ? section8.querySelector('.logo-final') : null;
        const fraseFinal = section8 ? section8.querySelector('.frase-final') : null;
        
        if (logoFinal && fraseFinal) {
            // Estado inicial - logo muito pequeno e invisível
            gsap.set(logoFinal, {
                opacity: 0,
                scale: 0.05,
                y: 60,
                rotation: -15
            });
            
            gsap.set(fraseFinal, {
                opacity: 0,
                y: 30
            });
            
            // Timeline com ScrollTrigger - MAIS SUAVE E SINCRONIZADA
            const tl8 = gsap.timeline({
                scrollTrigger: {
                    trigger: section8,
                    start: isMobile ? "top 95%" : "top 90%",
                    end: () => `top+=${centerOffset}px center`,
                    scrub: isMobile ? 1.2 : 1.0, // Scrub mais suave para movimento menos abrupto
                    markers: false
                }
            });
            
            // Logo aparece com efeito gelatina SUAVE E SINCRONIZADO
            // Primeiro: aparece e cresce suavemente
            tl8.fromTo(logoFinal,
                { opacity: 0, scale: 0.3, y: 40, rotation: -10 },
                {
                    opacity: 1,
                    scale: 1.25, // Cresce menos para ser mais suave
                    y: 0,
                    rotation: 5, // Rotação menor
                    duration: isMobile ? 1.8 : 2.0,
                    ease: "power2.out" // Mais suave que power3
                },
                0
            )
            // Primeira oscilação suave - balança para o lado direito
            .to(logoFinal, {
                scale: 1.1,
                rotation: -8,
                y: 3,
                duration: isMobile ? 1.0 : 1.2,
                ease: "elastic.out(1, 0.5)" // Mais suave
            }, ">-0.4")
            // Segunda oscilação - volta e vai para o lado esquerdo
            .to(logoFinal, {
                scale: 1.08,
                rotation: 6,
                y: -2,
                duration: isMobile ? 0.9 : 1.1,
                ease: "elastic.out(1, 0.6)" // Mais suave
            }, ">-0.35")
            // Terceira oscilação - balança de volta
            .to(logoFinal, {
                scale: 1.05,
                rotation: -4,
                y: 1,
                duration: isMobile ? 0.8 : 1.0,
                ease: "elastic.out(1, 0.7)" // Mais suave
            }, ">-0.3")
            // Quarta oscilação - movimento mais sutil
            .to(logoFinal, {
                scale: 1.03,
                rotation: 2,
                y: -1,
                duration: isMobile ? 0.7 : 0.9,
                ease: "elastic.out(1, 0.8)" // Mais suave
            }, ">-0.25")
            // Quinta oscilação - quase parando
            .to(logoFinal, {
                scale: 1.01,
                rotation: -1,
                y: 0.5,
                duration: isMobile ? 0.6 : 0.8,
                ease: "elastic.out(1, 0.9)" // Mais suave
            }, ">-0.2")
            // Volta ao estado normal suavemente (gelatina parando)
            .to(logoFinal, {
                scale: 1,
                rotation: 0,
                y: 0,
                duration: isMobile ? 0.8 : 1.0,
                ease: "power2.out" // Retorno muito suave
            }, ">-0.15");
            
            // Frase aparece abaixo - sincronizado com o logo
            tl8.to(fraseFinal, {
                opacity: 1,
                y: 0,
                duration: isMobile ? 1.5 : 1.8,
                ease: "power2.out" // Mais suave
            }, isMobile ? 1.2 : 1.5); // Aparece depois que o logo está mais estável
        }
    }
    
    // FOOTER - Aparece apenas quando o scroll chega ao fim
    const footer = document.querySelector('.hq-footer');
    if (footer) {
        // Garantir que o footer está inicialmente invisível
        footer.style.opacity = "0";
        footer.style.visibility = "hidden";
        
        // Inicializar footer com GSAP
        gsap.set(footer, {
            opacity: 0,
            visibility: "hidden",
            y: 30
        });
        
        // Função para verificar se chegou ao fim do scroll
        let footerVisible = false;
        const checkScrollEnd = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            
            // Se está a menos de 200px do fim
            const isAtEnd = (scrollTop + windowHeight >= documentHeight - 200);
            
            if (isAtEnd && !footerVisible) {
                footerVisible = true;
                gsap.to(footer, {
                    opacity: 1,
                    visibility: "visible",
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    overwrite: true
                });
            } else if (!isAtEnd && footerVisible) {
                footerVisible = false;
                gsap.to(footer, {
                    opacity: 0,
                    visibility: "hidden",
                    y: 30,
                    duration: 0.5,
                    ease: "power2.in",
                    overwrite: true
                });
            }
        };
        
        // ScrollTrigger como método principal
        ScrollTrigger.create({
            trigger: footer,
            start: "top bottom-=150",
            onEnter: () => {
                if (!footerVisible) {
                    footerVisible = true;
                    gsap.to(footer, {
                        opacity: 1,
                        visibility: "visible",
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        overwrite: true
                    });
                }
            },
            onEnterBack: () => {
                if (!footerVisible) {
                    footerVisible = true;
                    gsap.to(footer, {
                        opacity: 1,
                        visibility: "visible",
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        overwrite: true
                    });
                }
            },
            onLeaveBack: () => {
                if (footerVisible) {
                    footerVisible = false;
                    gsap.to(footer, {
                        opacity: 0,
                        visibility: "hidden",
                        y: 30,
                        duration: 0.5,
                        ease: "power2.in",
                        overwrite: true
                    });
                }
            },
            markers: false
        });
        
        // Listener de scroll como método principal (mais confiável)
        const handleScroll = () => {
            requestAnimationFrame(checkScrollEnd);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        
        // Verificar estado inicial após o carregamento completo
        const initFooter = () => {
            checkScrollEnd();
        };
        
        // Múltiplas tentativas para garantir que funciona
        setTimeout(initFooter, 100);
        setTimeout(initFooter, 300);
        setTimeout(initFooter, 600);
        
        // Verificar quando a página carregar completamente
        if (document.readyState === 'complete') {
            initFooter();
        } else {
            window.addEventListener('load', initFooter);
        }
    }
    
    // HEADER NÃO DEVE TER NENHUMA ANIMAÇÃO - COMPLETAMENTE ESTÁTICO
    // Remover qualquer animação do header, tanto mobile quanto desktop
    // O header deve aparecer imediatamente e permanecer fixo
    
    // HEADER DEVE SER COMPLETAMENTE ESTÁTICO - SEM INTERAÇÃO COM SCROLL
    // Remover qualquer listener do ScrollTrigger que possa afetar o header
    // O header já está configurado acima e não deve ser tocado
    
    // Refresh quando redimensionar
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const currentIsMobile = window.innerWidth <= 768;
            const currentHeader = currentIsMobile 
                ? document.querySelector('.header-wrapper-mobile .hq-header')
                : document.querySelector('.hq-header-desktop');
            
            // Recalcular altura do header (mas NUNCA animar)
            if (currentIsMobile) {
                const headerWrapper = document.querySelector('.header-wrapper-mobile');
                if (headerWrapper && currentHeader) {
                    headerWrapper.style.setProperty('position', 'fixed', 'important');
                    headerWrapper.style.setProperty('top', '0', 'important');
                    currentHeader.style.setProperty('position', 'relative', 'important');
                }
            } else {
                if (currentHeader) {
                    currentHeader.style.setProperty('position', 'fixed', 'important');
                    currentHeader.style.setProperty('top', '0', 'important');
                    currentHeader.style.setProperty('left', '0', 'important');
                    currentHeader.style.setProperty('right', '0', 'important');
                    currentHeader.style.setProperty('transform', 'translateZ(0)', 'important');
                }
            }
            ScrollTrigger.refresh();
            // Garantir que está no topo após refresh
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 250);
    });
    
    // Garantir scroll para o topo quando a página estiver totalmente carregada
    window.addEventListener('load', function() {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        // Forçar novamente após um pequeno delay
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 100);
    });
    
    // PROTEÇÃO CONTÍNUA: Forçar header fixo e visível (sem bloquear outras animações)
    if (isMobile) {
        const headerWrapper = document.querySelector('.header-wrapper-mobile');
        const mobileHeader = document.querySelector('.header-wrapper-mobile .hq-header');
        if (headerWrapper && mobileHeader) {
            // Função que força o container isolado a permanecer fixo e centralizado
            const forceHeaderFixed = () => {
                if (headerWrapper && mobileHeader) {
                    // Container isolado sempre fixo, SEM SCROLL HORIZONTAL
                    headerWrapper.style.setProperty('position', 'fixed', 'important');
                    headerWrapper.style.setProperty('top', '0', 'important');
                    headerWrapper.style.setProperty('left', '0', 'important');
                    headerWrapper.style.setProperty('right', '0', 'important');
                    headerWrapper.style.setProperty('width', '100%', 'important');
                    headerWrapper.style.setProperty('max-width', '100%', 'important');
                    headerWrapper.style.setProperty('z-index', '1000', 'important');
                    headerWrapper.style.setProperty('pointer-events', 'none', 'important');
                    headerWrapper.style.setProperty('transform', 'translateZ(0)', 'important');
                    headerWrapper.style.setProperty('overflow-x', 'hidden', 'important');
                    headerWrapper.style.setProperty('margin', '0', 'important');
                    headerWrapper.style.setProperty('padding', '0', 'important');
                    
                    // Header dentro do container - CENTRALIZADO
                    mobileHeader.style.setProperty('position', 'relative', 'important');
                    mobileHeader.style.setProperty('left', '0', 'important');
                    mobileHeader.style.setProperty('right', '0', 'important');
                    mobileHeader.style.setProperty('width', '100%', 'important');
                    mobileHeader.style.setProperty('max-width', '100%', 'important');
                    mobileHeader.style.setProperty('margin', '0 auto', 'important');
                    mobileHeader.style.setProperty('text-align', 'center', 'important');
                    mobileHeader.style.setProperty('pointer-events', 'auto', 'important');
                    mobileHeader.style.setProperty('opacity', '1', 'important');
                    mobileHeader.style.setProperty('visibility', 'visible', 'important');
                    mobileHeader.style.setProperty('overflow-x', 'hidden', 'important');
                }
            };
            
            // Usar intervalo para manter fixo
            setInterval(forceHeaderFixed, 200);
            
            // Proteger no scroll
            window.addEventListener('scroll', forceHeaderFixed, { passive: true });
        }
    } else {
        // Desktop: proteção normal
        const desktopHeader = document.querySelector('.hq-header-desktop');
        if (desktopHeader) {
            const forceHeaderFixed = () => {
                if (desktopHeader) {
                    const computed = window.getComputedStyle(desktopHeader);
                    if (computed.position !== 'fixed') {
                        desktopHeader.style.setProperty('position', 'fixed', 'important');
                    }
                    if (computed.top !== '0px') {
                        desktopHeader.style.setProperty('top', '0', 'important');
                    }
                    if (computed.opacity !== '1') {
                        desktopHeader.style.setProperty('opacity', '1', 'important');
                    }
                }
            };
            setInterval(forceHeaderFixed, 200);
        }
    }
});

