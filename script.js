// ============================================
// PROJETO DREAMERS CONTRA O SOMBRA
// Usando apenas GSAP e ScrollTrigger
// Otimizado para mobile
// ============================================

// Aguardar DOM e GSAP estarem carregados
(function() {
    'use strict';
    
    // Função para inicializar quando tudo estiver pronto
    let retryCount = 0;
    const MAX_RETRIES = 50; // Tentar por até 5 segundos (50 * 100ms)
    
    function initializeApp() {
        // Verificar se GSAP está disponível
        if (typeof gsap === 'undefined') {
            retryCount++;
            if (retryCount < MAX_RETRIES) {
                // Tentar novamente após um delay
                setTimeout(initializeApp, 100);
            } else {
                console.error('GSAP não carregou após múltiplas tentativas!');
                // Mostrar mensagem de erro ao usuário
                if (document.body) {
                    document.body.innerHTML = '<div style="padding: 20px; text-align: center; color: white; font-family: Arial; background: #1e293b; min-height: 100vh; display: flex; align-items: center; justify-content: center;">Erro ao carregar a aplicação. Por favor, recarregue a página.</div>';
                }
            }
            return;
        }
        
        // Registrar ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            try {
                gsap.registerPlugin(ScrollTrigger);
            } catch (e) {
                console.error('Erro ao registrar ScrollTrigger:', e);
                retryCount++;
                if (retryCount < MAX_RETRIES) {
                    setTimeout(initializeApp, 100);
                }
                return;
            }
        } else {
            retryCount++;
            if (retryCount < MAX_RETRIES) {
                // Tentar novamente após um delay
                setTimeout(initializeApp, 100);
            } else {
                console.error('ScrollTrigger não carregou após múltiplas tentativas!');
                if (document.body) {
                    document.body.innerHTML = '<div style="padding: 20px; text-align: center; color: white; font-family: Arial; background: #1e293b; min-height: 100vh; display: flex; align-items: center; justify-content: center;">Erro ao carregar a aplicação. Por favor, recarregue a página.</div>';
                }
            }
            return;
        }
        
        // Resetar contador de tentativas
        retryCount = 0;
        
        // Verificar se DOM está pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startApp);
        } else {
            startApp();
        }
    }
    
    // Função principal que inicia a aplicação
    function startApp() {
        // Verificar novamente se GSAP está disponível
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.error('GSAP ou ScrollTrigger não estão disponíveis!');
            return;
        }
        
        // Continuar com o código original aqui
    
    // ============================================
    // CONFIGURAÇÕES GLOBAIS
    // ============================================
    const isMobile = () => window.innerWidth <= 768;
    const screenWidth = window.innerWidth;
    
    // ============================================
    // UTILITÁRIOS
    // ============================================
    function scrollToTop() {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }
    
    // ============================================
    // HEADER - CONFIGURAÇÃO SIMPLIFICADA
    // ============================================
    function setupHeader() {
        const mobile = isMobile();
        const headerWrapper = document.querySelector('.header-wrapper-mobile');
        const desktopHeader = document.querySelector('.hq-header-desktop');
        const mobileHeader = headerWrapper ? headerWrapper.querySelector('.hq-header') : null;
        
        if (mobile && headerWrapper && mobileHeader) {
            // Mobile: container isolado fixo
            gsap.set(headerWrapper, {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                zIndex: 1000,
                pointerEvents: 'none',
                opacity: 1,
                visibility: 'visible'
            });
            
            gsap.set(mobileHeader, {
                position: 'relative',
                width: '100%',
                pointerEvents: 'auto',
                opacity: 1,
                visibility: 'visible'
            });
        } else if (!mobile && desktopHeader) {
            // Desktop: header fixo
            gsap.set(desktopHeader, {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                zIndex: 100,
                opacity: 1,
                visibility: 'visible'
            });
        }
    }
    
    // ============================================
    // ANIMAÇÃO DO HEADER (EFEITO PIPOCA CRESCENTE)
    // ============================================
    function animateHeader(onComplete) {
        const mobile = isMobile();
        const header = mobile 
        ? document.querySelector('.header-wrapper-mobile .hq-header')
        : document.querySelector('.hq-header-desktop');
    
        if (!header) {
            if (onComplete) onComplete();
            return null;
        }
        
        const logo = header.querySelector('.header-logo');
        const h1 = header.querySelector('h1');
        
        // Garantir que header está visível
        gsap.set(header, { opacity: 1, visibility: 'visible' });
        
        // Estado inicial - elementos pequenos e invisíveis
        if (logo) {
            gsap.set(logo, { 
                opacity: 0,
                scale: 0.1,
                rotation: -15
            });
        }
        
        if (h1) {
            gsap.set(h1, { 
                opacity: 0, 
                scale: 0.3,
                y: 20
            });
        }
        
        const tl = gsap.timeline({ 
            delay: 0.3,
            onComplete: () => {
                // Chamar callback imediatamente quando header terminar
                if (onComplete) {
                    onComplete();
                }
            }
        });
        
        // Logo aparece com efeito pipoca crescente
        if (logo) {
            tl.to(logo, {
                opacity: 1, 
                scale: 1.15,
                rotation: 5,
                duration: mobile ? 0.9 : 1.1,
                ease: 'elastic.out(1, 0.6)'
            }, 0).to(logo, {
                scale: 1,
                rotation: 0,
                duration: mobile ? 0.3 : 0.35,
                ease: 'power1.out'
            }, '>-0.1');
        }
        
        // H1 aparece com efeito pipoca crescente (junto com logo)
        if (h1) {
            tl.to(h1, {
                opacity: 1,
                scale: 1.1,
                y: 0,
                duration: mobile ? 1.0 : 1.2,
                ease: 'elastic.out(1, 0.7)'
            }, mobile ? 0.1 : 0.15).to(h1, {
                scale: 1,
                duration: mobile ? 0.25 : 0.3,
                ease: 'power1.out'
            }, '>-0.1');
        }
        
        // Calcular duração total do header para garantir que termine
        // Logo: 0.9/1.1 + 0.3/0.35 = ~1.2/1.45s
        // H1: 0.1/0.15 + 1.0/1.2 + 0.25/0.3 = ~1.35/1.65s
        // Total: ~1.65s (mobile) ou ~1.8s (desktop)
        
        return tl;
    }
    
    // ============================================
    // PRIMEIRO SLIDE - ANIMAÇÃO INICIAL
    // ============================================
    function animateFirstSlide(onComplete) {
        const sections = document.querySelectorAll('.story-section');
        if (sections.length === 0) {
            if (onComplete) onComplete();
            return null; // Retornar null se não houver seções
        }
        
        const firstSection = sections[0];
        const firstPanel = firstSection.querySelector('.panel');
        const firstImage = firstSection.querySelector('.panel-visual-img');
        const firstTextFrame = firstSection.querySelector('.panel-text-frame');
        const firstDialogue = firstSection.querySelector('.dialogue');
        
        if (!firstPanel || !firstSection) {
            if (onComplete) onComplete();
            return null; // Retornar null se não houver painel
        }
        
        const mobile = isMobile();
        const headerHeight = mobile 
            ? (document.querySelector('.header-wrapper-mobile .hq-header')?.offsetHeight || 100)
            : (document.querySelector('.hq-header-desktop')?.offsetHeight || 100);
        
        // Estado inicial - COMPLETAMENTE OCULTO até header terminar
        // Garantir via CSS inline também
        if (firstSection) {
            firstSection.style.opacity = '0';
            firstSection.style.visibility = 'hidden';
            firstSection.style.display = 'none';
            
            gsap.set(firstSection, { 
                opacity: 0, 
                visibility: 'hidden',
                display: 'none' // Garantir que não apareça
            });
        }
        
        // Painel começa invisível (será fade in primeiro)
        gsap.set(firstPanel, {
                opacity: 0, 
            visibility: 'visible' // Visível mas transparente para fade in
            });
        
        // Elementos internos começam pequenos (efeito pipoca depois)
        if (firstImage) {
            gsap.set(firstImage, {
                opacity: 0,
                scale: 0.1,
                y: mobile ? 40 : 70,
                rotation: mobile ? -15 : -12,
                visibility: 'visible'
            });
        }
        
        if (firstTextFrame) {
            gsap.set(firstTextFrame, {
                opacity: 0,
                scale: 0.4,
                y: mobile ? 35 : 60,
                x: mobile ? 20 : 30,
                visibility: 'visible'
            });
                    }
                    
                    if (firstDialogue) {
            gsap.set(firstDialogue, {
                opacity: 0,
                scale: 0.5,
                y: mobile ? 25 : 35,
                visibility: 'visible'
            });
        }
        
        // Timeline de animação inicial - NÃO EXECUTAR AINDA
        // Será executada apenas quando o callback do header for chamado
            const initialTL = gsap.timeline({
            paused: true, // PAUSADA - será executada manualmente
                onComplete: () => {
                // Após animação inicial, configurar ScrollTrigger
                setupFirstSlideScrollTrigger(firstSection, firstPanel, firstImage, firstTextFrame, firstDialogue, headerHeight);
                // Chamar callback quando slide 1 terminar
                if (onComplete) onComplete();
            }
        });
        
        // PASSO 1: Fade in do painel primeiro
            initialTL.to(firstPanel, {
                opacity: 1,
            duration: mobile ? 0.8 : 1.0,
            ease: 'power2.out'
        }, 0);
        
        // PASSO 2: Elementos internos com efeito pipoca crescente (após fade in do painel)
        const pipocaStart = mobile ? 0.4 : 0.5; // Começar após fade in do painel
        
        // Imagem com pipoca
            if (firstImage) {
                initialTL.to(firstImage, {
                    opacity: 1,
                    scale: 1.12,
                    rotation: 0,
                    y: 0,
                duration: mobile ? 1.1 : 1.0,
                ease: 'elastic.out(1, 0.6)'
            }, pipocaStart).to(firstImage, {
                    scale: 1,
                duration: mobile ? 0.45 : 0.35,
                ease: 'power1.out'
            }, '>-0.15');
        }
        
        // Texto com pipoca
            if (firstTextFrame) {
                initialTL.to(firstTextFrame, {
                    opacity: 1,
                    scale: 1.06,
                    y: 0,
                    x: 0,
                duration: mobile ? 1.0 : 0.9,
                ease: 'elastic.out(1, 0.7)'
            }, pipocaStart + (mobile ? 0.1 : 0.15)).to(firstTextFrame, {
                    scale: 1,
                duration: mobile ? 0.35 : 0.3,
                ease: 'power1.out'
            }, '>-0.12');
        }
        
        // Diálogo com pipoca
        if (firstDialogue) {
            initialTL.to(firstDialogue, {
                opacity: 1,
                scale: 1.05,
                y: 0,
                duration: mobile ? 0.9 : 0.8,
                ease: 'elastic.out(1, 0.75)'
            }, pipocaStart + (mobile ? 0.2 : 0.25)).to(firstDialogue, {
                scale: 1,
                duration: mobile ? 0.25 : 0.2,
                ease: 'power1.out'
            }, '>-0.1');
        }
        
        // Retornar a timeline para ser executada quando header terminar
        return {
            timeline: initialTL,
            section: firstSection,
            panel: firstPanel
        };
    }
    
    // ============================================
    // PRIMEIRO SLIDE - SCROLL TRIGGER
    // ============================================
    function setupFirstSlideScrollTrigger(section, panel, image, textFrame, dialogue, headerHeight) {
        // O primeiro slide já foi animado, então não precisa de ScrollTrigger
        // Apenas garantir que os elementos estejam no estado final
        // Não criar animação de scroll para o primeiro slide
        // Os elementos já estão animados e visíveis
    }
    
    // ============================================
    // SLIDES SEGUINTES - ANIMAÇÃO DE SCROLL
    // ============================================
    function animateSubsequentSlides() {
        const sections = document.querySelectorAll('.story-section');
        const mobile = isMobile();
        const baseDistance = mobile ? screenWidth * 0.7 : screenWidth * 1.2;
        
        const headerHeight = mobile 
            ? (document.querySelector('.header-wrapper-mobile .hq-header')?.offsetHeight || 100)
            : (document.querySelector('.hq-header-desktop')?.offsetHeight || 100);
    
    sections.forEach((section, index) => {
            if (index === 0) return; // Pular primeiro slide
            
            // GARANTIR QUE SLIDES SEGUINTES ESTÃO VISÍVEIS AGORA (scroll foi habilitado)
            // Usar setProperty para sobrescrever !important
            section.style.setProperty('opacity', '1', 'important');
            section.style.setProperty('visibility', 'visible', 'important');
            section.style.setProperty('pointer-events', 'auto', 'important');
            
            gsap.set(section, {
                opacity: 1,
                visibility: 'visible',
                pointerEvents: 'auto',
                immediateRender: true
            });
        
        const panel = section.querySelector('.panel');
        const image = section.querySelector('.panel-visual-img');
        const textFrame = section.querySelector('.panel-text-frame');
            const dialogue = section.querySelector('.dialogue');
        
            if (!panel) return;
            
            // Direção alternada
        const slideFromLeft = index % 2 === 1;
        
            // Distância crescente no mobile - SLIDE 3 COM EFEITO LEQUE MUITO EVIDENTE
        let slideDistance;
            if (mobile) {
            // Slide 3 (index === 2) tem distância MUITO MAIOR para efeito leque evidente
            if (index === 2) {
                const multiplier = 1.8; // MUITO mais distante para efeito leque (aumentado de 1.2)
                slideDistance = screenWidth * multiplier;
            } else {
                const multiplier = 0.7 + (index - 1) * 0.15;
                slideDistance = screenWidth * multiplier;
            }
        } else {
                slideDistance = baseDistance;
        }
            
        const fromX = slideFromLeft ? -slideDistance : slideDistance;
            // Slide 3 tem rotação MUITO maior no mobile (efeito leque)
            const rotationAmount = mobile 
                ? (index === 2 ? 30 : (8 + (index - 1) * 3)) // Slide 3: 30 graus (aumentado)
                : 0;
            // Slide 3 começa MUITO menor no mobile (efeito leque)
            const scaleAmount = mobile 
                ? (index === 2 ? 0.4 : (0.85 - (index - 1) * 0.03)) // Slide 3: 0.4 (muito menor)
                : 1;
            
            // Estado inicial
        gsap.set(panel, { 
            x: fromX, 
            opacity: 0,
                rotation: mobile ? (slideFromLeft ? -rotationAmount : rotationAmount) : 0,
                scale: mobile ? scaleAmount : 1
            });
            
            if (image) {
                // Slide 3: imagem começa MUITO menor e mais distante no mobile (efeito leque)
                const imageScale = mobile && index === 2 ? 0.05 : 0.2; // Slide 3: 0.05 (muito menor)
                const imageY = mobile 
                    ? (index === 2 ? 80 : (35 + (index - 1) * 5)) // Slide 3: 80px (mais abaixo)
                    : 60;
                const imageRotation = mobile && index === 2 
                    ? (slideFromLeft ? -35 : 35) // Slide 3: rotação MUITO maior (35 graus)
                    : (slideFromLeft ? -12 : 12);
                const imageX = mobile && index === 2 
                    ? fromX * 0.9 // Slide 3: MUITO mais distante lateralmente (efeito leque)
                    : fromX * 0.4;
                    
                gsap.set(image, {
            opacity: 0, 
                    scale: imageScale,
                    y: imageY,
                    rotation: imageRotation,
                    x: imageX
                });
            }
            
            if (textFrame) {
                // Slide 3: texto começa MUITO menor no mobile (efeito leque)
                const textScale = mobile && index === 2 ? 0.3 : 0.8; // Slide 3: 0.3 (muito menor)
                const textY = mobile 
                    ? (index === 2 ? 70 : (30 + (index - 1) * 5)) // Slide 3: 70px (mais abaixo)
                    : 50;
                const textX = mobile && index === 2 
                    ? (slideFromLeft ? -80 : 80) // Slide 3: MUITO mais distante lateralmente (efeito leque)
                    : (slideFromLeft ? -30 : 30);
                    
                gsap.set(textFrame, {
            opacity: 0, 
                    scale: textScale,
                    y: textY,
                    x: textX
                });
            }
            
            if (dialogue) {
                // Slide 3: diálogo começa mais abaixo no mobile
                const dialogueY = mobile 
                    ? (index === 2 ? 35 : (20 + (index - 1) * 6)) // Slide 3: 35px
                    : 30;
                gsap.set(dialogue, {
            opacity: 0,
                    y: dialogueY
                });
            }
            
            // Timeline com ScrollTrigger
            const startValue = mobile 
                ? (index === 1 ? 'top 90%' : 'top 98%')
                : 'top 90%';
            
            const endValue = mobile 
                ? (index === 1 ? 'bottom top' : () => `top+=${headerHeight + (index * 100)}px center`)
                : () => `top+=${headerHeight}px center`;
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: startValue,
                end: endValue,
                    scrub: mobile 
                        ? (index === 2 ? 0.3 : (index === 1 ? 0.4 : 0.5)) // Slide 3: scrub mais suave (mais evidente)
                        : 0.6,
                invalidateOnRefresh: true,
                    preventOverlaps: true
            }
        });
        
            // Painel - SLIDE 3 COM EFEITO LEQUE MUITO EVIDENTE NO MOBILE
            const panelDuration = mobile 
                ? (index === 2 ? 2.5 : (1.5 + (index - 1) * 0.15)) // Slide 3: 2.5s (mais lento para efeito leque)
                : 1.2;
            const panelEase = mobile && index === 2 
                ? 'elastic.out(1, 0.4)' // Slide 3: easing MUITO mais dramático (efeito leque)
                : (mobile ? 'power2.out' : 'expo.out');
                
        tl.to(panel, {
            x: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: panelDuration,
            ease: panelEase
        }, 0);
        
            // Imagem - SLIDE 3 MAIS EVIDENTE NO MOBILE
        if (image) {
                const imageStartTime = mobile 
                    ? (index === 2 ? 0.5 : (0.4 + (index - 1) * 0.1)) // Slide 3: começa mais tarde
                    : 0.35;
                    
                // Slide 3: valores iniciais MUITO mais extremos (efeito leque)
                const imageFromScale = mobile && index === 2 ? 0.05 : 0.2; // Slide 3: 0.05 (muito menor)
                const imageFromY = mobile 
                    ? (index === 2 ? 80 : (35 + (index - 1) * 5)) // Slide 3: 80px
                    : 60;
                const imageFromRotation = mobile && index === 2 
                    ? (slideFromLeft ? -35 : 35) // Slide 3: 35 graus (muito maior)
                    : (slideFromLeft ? -12 : 12);
                const imageFromX = mobile && index === 2 
                    ? fromX * 0.9 // Slide 3: MUITO mais distante lateralmente
                    : fromX * 0.4;
                    
                // Slide 3: animação MUITO mais dramática (efeito leque)
                const imageDuration = mobile 
                    ? (index === 2 ? 2.2 : (1.4 + (index - 1) * 0.12)) // Slide 3: 2.2s (mais lento)
                    : 1.3;
                const imageEase = mobile && index === 2 
                    ? 'elastic.out(1, 0.3)' // Slide 3: bounce MUITO mais forte
                    : 'elastic.out(1, 0.6)';
                const imageScale = mobile && index === 2 ? 1.4 : 1.2; // Slide 3: cresce MUITO mais (1.4)
                    
            tl.fromTo(image,
                    { 
                        opacity: 0, 
                        scale: imageFromScale, 
                        y: imageFromY, 
                        rotation: imageFromRotation, 
                        x: imageFromX 
                    },
                {
                    opacity: 1,
                    scale: imageScale,
                    rotation: 0,
                    y: 0,
                    x: 0,
                    duration: imageDuration,
                    ease: imageEase
                },
                imageStartTime
            ).to(image, {
                scale: 1,
                duration: mobile && index === 2 ? 0.6 : (mobile ? 0.5 : 0.35), // Slide 3: mais lento
                ease: 'power1.out'
            }, '>-0.15');
        }
            
            // Texto - SLIDE 3 MAIS EVIDENTE NO MOBILE
        if (textFrame) {
                const textStartTime = mobile 
                    ? (index === 2 ? 0.6 : (0.45 + (index - 1) * 0.1)) // Slide 3: mais tarde
                    : 0.4;
                    
                // Slide 3: valores iniciais MUITO mais extremos (efeito leque)
                const textFromScale = mobile && index === 2 ? 0.3 : 0.8; // Slide 3: 0.3 (muito menor)
                const textFromY = mobile 
                    ? (index === 2 ? 70 : (30 + (index - 1) * 5)) // Slide 3: 70px
                    : 50;
                const textFromX = mobile && index === 2 
                    ? (slideFromLeft ? -80 : 80) // Slide 3: MUITO mais distante lateralmente
                    : (slideFromLeft ? -30 : 30);
                    
                // Slide 3: animação MUITO mais dramática (efeito leque)
                const textBounce = mobile && index === 2 ? 0.4 : 0.7; // Slide 3: bounce MUITO mais forte
                const textDuration = mobile 
                    ? (index === 2 ? 1.8 : (1.2 + (index - 1) * 0.1)) // Slide 3: 1.8s (mais lento)
                    : 1.1;
                const textScale = mobile && index === 2 ? 1.2 : 1.05; // Slide 3: cresce MUITO mais (1.2)
                    
            tl.fromTo(textFrame,
                    { 
                        opacity: 0, 
                        scale: textFromScale, 
                        y: textFromY, 
                        x: textFromX 
                    },
                {
                    opacity: 1,
                    scale: textScale,
                    y: 0,
                    x: 0,
                    duration: textDuration,
                    ease: `elastic.out(1, ${textBounce})`
                },
                textStartTime
            ).to(textFrame, {
                scale: 1,
                duration: mobile && index === 2 ? 0.4 : (mobile ? 0.3 : 0.2), // Slide 3: mais lento
                ease: 'power1.out'
            }, '>-0.12');
        }
            
            // Diálogo
            // Diálogo - SLIDE 3 MAIS EVIDENTE NO MOBILE
            if (dialogue) {
                const dialogueStartTime = mobile 
                    ? (index === 2 ? 0.5 : (0.3 + (index - 1) * 0.08)) // Slide 3: mais tarde
                    : 0.25;
                const dialogueDuration = mobile 
                    ? (index === 2 ? 1.4 : (1.1 + (index - 1) * 0.1)) // Slide 3: 1.4s
                    : 0.95;
                const dialogueEase = mobile && index === 2 
                    ? 'elastic.out(1, 0.6)' // Slide 3: bounce mais forte
                    : (mobile ? 'power1.out' : 'power3.out');
                const dialogueFromY = mobile && index === 2 ? 35 : (mobile ? (20 + (index - 1) * 6) : 30);
                
                tl.fromTo(dialogue,
                    { opacity: 0, y: dialogueFromY },
                    {
                        opacity: 1,
                        y: 0,
                        duration: dialogueDuration,
                        ease: dialogueEase
                    },
                    dialogueStartTime
                );
            }
        });
    }
    
    // ============================================
    // SLIDE FINAL (8) - ANIMAÇÃO ESPECIAL
    // ============================================
    function animateFinalSlide() {
        const sections = document.querySelectorAll('.story-section');
        if (sections.length < 8) return;
        
        const section8 = sections[7];
        
        // GARANTIR QUE SLIDE FINAL ESTÁ VISÍVEL (scroll foi habilitado)
        section8.style.setProperty('opacity', '1', 'important');
        section8.style.setProperty('visibility', 'visible', 'important');
        section8.style.setProperty('pointer-events', 'auto', 'important');
        
        gsap.set(section8, {
            opacity: 1,
            visibility: 'visible',
            pointerEvents: 'auto',
            immediateRender: true
        });
        
        const logoFinal = section8.querySelector('.logo-final');
        const fraseFinal = section8.querySelector('.frase-final');
        
        if (!logoFinal || !fraseFinal) return;
        
        const mobile = isMobile();
        const headerHeight = mobile 
            ? (document.querySelector('.header-wrapper-mobile .hq-header')?.offsetHeight || 100)
            : (document.querySelector('.hq-header-desktop')?.offsetHeight || 100);
        
        // Estado inicial - logo invisível, 400px mais para baixo
        // Limpar qualquer transform anterior primeiro
        gsap.set(logoFinal, {
            clearProps: 'all' // Limpar todas as propriedades anteriores
        });
        
        // Estado inicial completo - DEVE corresponder ao início da timeline
        // Começar do estado inicial da animação para evitar "jump"
            gsap.set(logoFinal, {
                opacity: 0,
            scale: 0.3, // Começa pequeno (estado inicial da animação)
            y: mobile ? 900 : 910, // Posição inicial abaixo
            rotation: mobile ? -20 : -18, // Rotação inicial
            x: mobile ? -15 : -12, // Posição lateral inicial
            force3D: true, // Forçar aceleração de hardware
            immediateRender: true // Renderizar imediatamente para evitar jump
            });
            
            gsap.set(fraseFinal, {
                opacity: 0,
            scaleX: 0.3, // Estado inicial do esticamento
            scaleY: 1.5,
            y: mobile ? 15 : 20,
            rotation: mobile ? -5 : -4,
            filter: 'blur(5px)',
            immediateRender: true // Renderizar imediatamente para evitar jump
        });
        
        // Criar timeline ANTES do ScrollTrigger para garantir estado inicial
        const tl8 = gsap.timeline({ paused: true }); // Pausada inicialmente
        
        // Logo com efeito IMPACTANTE DE HQ - ESTILO "POW!" / EXPLOSÃO
        // EFEITO HQ: Logo aparece com explosão dramática (SUAVE desde o início)
        // Primeiro: subida suave + zoom dramático com rotação (efeito de impacto)
            tl8.fromTo(logoFinal,
            // Estado inicial (já definido acima, mas garantindo aqui também)
            {
                opacity: 0,
                scale: 0.3,
                y: mobile ? 900 : 910,
                rotation: mobile ? -20 : -18,
                x: mobile ? -15 : -12
            },
            // Estado final da primeira fase
                {
                    opacity: 1,
                y: 0, // Sobe de 900/910 para 0
                scale: 1.4, // Cresce muito (efeito de explosão)
                rotation: mobile ? 15 : 12, // Rotação dramática
                x: mobile ? 8 : 10, // Movimento lateral
                duration: mobile ? 0.4 : 0.5,
                ease: 'power4.out' // Easing muito dramático
            },
            0
        )
        // Segundo: volta com bounce (efeito de rebote de HQ)
            .to(logoFinal, {
            scale: 0.9,
            rotation: mobile ? -8 : -6,
            x: mobile ? -4 : -5,
            duration: mobile ? 0.3 : 0.35,
            ease: 'power2.out'
        }, '>-0.1')
        // Terceiro: oscilação final (efeito de estabilização)
            .to(logoFinal, {
                scale: 1.05,
            rotation: mobile ? 3 : 2,
            x: mobile ? 2 : 2.5,
            duration: mobile ? 0.25 : 0.3,
            ease: 'power1.out'
        }, '>-0.08')
        // Quarto: normalização final
            .to(logoFinal, {
                scale: 1,
                rotation: 0,
            x: 0,
            duration: mobile ? 0.3 : 0.35,
            ease: 'power1.out'
        }, '>-0.06');
        
        // Frase aparece com efeito de BALÃO DE FALA DE HQ
        // Efeito de texto aparecendo com "stretch" (esticamento de HQ)
        tl8.fromTo(fraseFinal, 
            {
                opacity: 0,
                scaleX: 0.3, // Esticamento horizontal (efeito de balão)
                scaleY: 1.5, // Esticamento vertical
                y: mobile ? 15 : 20,
                rotation: mobile ? -5 : -4,
                filter: 'blur(5px)' // Efeito de desfoque inicial
            },
            {
                opacity: 1,
                scaleX: 1.1, // Primeiro estica
                scaleY: 0.9,
                y: 0,
                rotation: mobile ? 2 : 1.5,
                filter: 'blur(0px)',
                duration: mobile ? 0.5 : 0.6,
                ease: 'back.out(1.7)' // Easing com bounce (efeito de balão)
            },
            mobile ? 0.6 : 0.7 // Começa durante a oscilação do logo
        )
        // Normalização da frase
        .to(fraseFinal, {
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            duration: mobile ? 0.3 : 0.35,
            ease: 'power1.out'
        }, '>-0.1');
        
        // Configurar ScrollTrigger DEPOIS de criar toda a timeline
        // Isso garante que o estado inicial está correto antes do scroll
        ScrollTrigger.create({
            trigger: section8,
            start: mobile ? 'top 95%' : 'top 90%',
            end: () => `top+=${headerHeight}px center`,
            scrub: mobile ? 1.5 : 1.2,
            animation: tl8, // Usar timeline criada
            invalidateOnRefresh: true, // Garantir recálculo suave
            anticipatePin: 1, // Antecipar pin para suavidade
            onUpdate: () => {
                // Garantir que o estado inicial está sempre correto durante o scroll
                if (tl8.progress() === 0) {
                    gsap.set(logoFinal, {
                        opacity: 0,
                        scale: 0.3,
                        y: mobile ? 900 : 910,
                        rotation: mobile ? -20 : -18,
                        x: mobile ? -15 : -12,
                        immediateRender: true
                    });
                }
            }
        });
    }
    
    // ============================================
    // FOOTER - ANIMAÇÃO
    // ============================================
    function animateFooter() {
    const footer = document.querySelector('.hq-footer');
        if (!footer) return;
        
        // GARANTIR QUE FOOTER ESTÁ COMPLETAMENTE OCULTO AO CARREGAR
        footer.style.setProperty('opacity', '0', 'important');
        footer.style.setProperty('visibility', 'hidden', 'important');
        footer.style.setProperty('display', 'none', 'important');
        
        gsap.set(footer, {
            opacity: 0,
            visibility: 'hidden',
            display: 'none', // Não renderizar
                    y: 30,
            immediateRender: true // Renderizar imediatamente
                });
        
        ScrollTrigger.create({
            trigger: footer,
            start: 'top bottom-=150',
            onEnter: () => {
                // Tornar visível primeiro
                footer.style.setProperty('display', 'block', 'important');
                    gsap.to(footer, {
                        opacity: 1,
                    visibility: 'visible',
                    display: 'block',
                        y: 0,
                        duration: 0.8,
                    ease: 'power3.out',
                        overwrite: true
                    });
            },
            onEnterBack: () => {
                // Tornar visível primeiro
                footer.style.setProperty('display', 'block', 'important');
                    gsap.to(footer, {
                        opacity: 1,
                    visibility: 'visible',
                    display: 'block',
                        y: 0,
                        duration: 0.8,
                    ease: 'power3.out',
                        overwrite: true
                    });
            },
            onLeaveBack: () => {
                    gsap.to(footer, {
                        opacity: 0,
                    visibility: 'hidden',
                    display: 'none', // Ocultar completamente
                        y: 30,
                        duration: 0.5,
                    ease: 'power2.in',
                    overwrite: true,
                    onComplete: () => {
                        // Garantir que está oculto
                        footer.style.setProperty('display', 'none', 'important');
                    }
                });
            }
        });
    }
    
    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    function init() {
        // Garantir scroll no topo
        scrollToTop();
        
        // GARANTIR QUE PRIMEIRO SLIDE ESTÁ OCULTO
        const firstSection = document.querySelector('#section-1');
        if (firstSection) {
            firstSection.style.opacity = '0';
            firstSection.style.visibility = 'hidden';
            firstSection.style.display = 'none';
        }
        
        // GARANTIR QUE TODOS OS SLIDES SEGUINTES ESTÃO OCULTOS
        const allSections = document.querySelectorAll('.story-section');
        allSections.forEach((section, index) => {
            if (index > 0) { // Pular primeiro slide (já ocultado acima)
                // Ocultar via style inline (sobrescreve CSS)
                section.style.setProperty('opacity', '0', 'important');
                section.style.setProperty('visibility', 'hidden', 'important');
                section.style.setProperty('pointer-events', 'none', 'important');
                section.style.setProperty('display', 'block', 'important'); // Manter display block mas invisível
                
                gsap.set(section, {
                    opacity: 0,
                    visibility: 'hidden',
                    pointerEvents: 'none'
                });
            }
        });
        
        // Desabilitar scroll temporariamente - apenas HTML pode ter scroll, mas vamos bloquear
        document.documentElement.style.setProperty('overflow-y', 'hidden', 'important');
        
        // Prevenir scroll via eventos
        let scrollBlocked = true;
        const preventScroll = (e) => {
            if (scrollBlocked) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };
        
        // Adicionar listeners para bloquear scroll
        const options = { passive: false, capture: true };
        window.addEventListener('wheel', preventScroll, options);
        window.addEventListener('touchmove', preventScroll, options);
        window.addEventListener('scroll', preventScroll, options);
        
        // Função para habilitar scroll
        const enableScroll = () => {
            scrollBlocked = false;
            document.documentElement.style.setProperty('overflow-y', 'auto', 'important');
            window.removeEventListener('wheel', preventScroll, options);
            window.removeEventListener('touchmove', preventScroll, options);
            window.removeEventListener('scroll', preventScroll, options);
        };
        
        // Configurar header PRIMEIRO
        setupHeader();
        
        // GARANTIR QUE HEADER ESTÁ VISÍVEL IMEDIATAMENTE
        const mobile = isMobile();
        const header = mobile 
                ? document.querySelector('.header-wrapper-mobile .hq-header')
                : document.querySelector('.hq-header-desktop');
        if (header) {
            header.style.opacity = '1';
            header.style.visibility = 'visible';
            header.style.display = 'block';
        }
        
        // SEQUÊNCIA: Header -> Slide 1 -> Habilitar Scroll -> Outros Slides
        // Aguardar um pequeno delay para garantir que tudo está pronto
        setTimeout(() => {
            animateHeader(() => {
                // Header terminou completamente, AGORA preparar slide 1
                const slide1Data = animateFirstSlide(() => {
                    // Slide 1 terminou, AGORA habilitar scroll
                    enableScroll();
                    
                    // Aguardar um pouco para garantir que scroll foi habilitado
                    setTimeout(() => {
                        // AGORA configurar outros slides (após scroll habilitado)
                        animateSubsequentSlides();
                        animateFinalSlide();
                        animateFooter();
                        
                        // Refresh ScrollTrigger
                        setTimeout(() => {
                            ScrollTrigger.refresh();
                        }, 200);
        }, 100);
    });
    
                // Tornar seção visível e executar animação APENAS quando header terminar
                if (slide1Data && slide1Data.timeline && slide1Data.section) {
                    // IMPORTANTE: Tornar seção visível ANTES de executar animação
                    const section = slide1Data.section;
                    
                    // Forçar visibilidade via style inline (sobrescreve CSS)
                    section.style.setProperty('opacity', '1', 'important');
                    section.style.setProperty('visibility', 'visible', 'important');
                    section.style.setProperty('display', 'block', 'important');
                    
                    // Também usar GSAP para garantir
                    gsap.set(section, { 
                        opacity: 1, 
                        visibility: 'visible',
                        display: 'block',
                        immediateRender: true // Renderizar imediatamente
                    });
                    
                    // Executar animação após garantir que está visível
                    if (slide1Data.timeline) {
                        // Usar requestAnimationFrame para garantir que o DOM atualizou
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                // Verificar se a seção está realmente visível
                                if (section.style.display !== 'none' && section.style.visibility !== 'hidden') {
                                    slide1Data.timeline.play();
    } else {
                                    // Se ainda estiver oculta, forçar novamente
                                    section.style.setProperty('opacity', '1', 'important');
                                    section.style.setProperty('visibility', 'visible', 'important');
                                    section.style.setProperty('display', 'block', 'important');
                                    slide1Data.timeline.play();
                                }
                            });
                        });
                    }
                } else {
                    console.error('Slide 1 data não encontrado ou incompleto:', slide1Data);
                }
            });
        }, 100);
    }
    
    // ============================================
    // RESIZE HANDLER
    // ============================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            scrollToTop();
            setupHeader();
            ScrollTrigger.refresh();
        }, 250);
    });
    
        // ============================================
        // EXECUTAR QUANDO DOM ESTIVER PRONTO
        // ============================================
        // Inicializar aplicação
        init();
        
        // Garantir scroll no topo quando página carregar
        window.addEventListener('load', () => {
            scrollToTop();
            setTimeout(scrollToTop, 100);
        });
    }
    
    // Inicializar quando tudo estiver pronto
    if (document.readyState === 'loading') {
        // DOM ainda carregando, aguardar
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        // DOM já carregado, verificar GSAP
        initializeApp();
    }
})();
