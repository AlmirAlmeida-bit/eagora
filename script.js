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
        
        // Aplicar Viewport Height Fix ANTES de tudo (sugestão do Gemini)
        setTrueVHeight();
        
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
    // VIEWPORT HEIGHT FIX PARA MOBILE
    // ============================================
    // Corrige problemas de altura no mobile causados pela barra de URL
    function setTrueVHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // ============================================
    // HEADER - REMOVIDO
    // ============================================
    // Funções de header removidas - não são mais necessárias
    
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
        // Header removido - não precisa calcular headerHeight
        const headerHeight = 0;
        
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
            duration: mobile ? 0.8 : 1.5, // Desktop: aumentado de 1.0 para 1.5s (mais suave)
            ease: 'power3.out' // Melhorado: mais suave
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
                duration: mobile ? 1.1 : 1.4, // Desktop: aumentado de 1.0 para 1.4s (mais suave)
                ease: 'elastic.out(1, 0.5)' // Melhorado: bounce mais suave
            }, pipocaStart).to(firstImage, {
                    scale: 1,
                duration: mobile ? 0.45 : 0.5, // Desktop: aumentado de 0.35 para 0.5s (mais suave)
                ease: 'power3.out' // Melhorado: mais suave // Melhorado: mais suave
            }, '>-0.15');
        }
        
        // Texto com pipoca
            if (firstTextFrame) {
                initialTL.to(firstTextFrame, {
                    opacity: 1,
                    scale: 1.06,
                    y: 0,
                    x: 0,
                duration: mobile ? 1.0 : 1.3, // Desktop: aumentado de 0.9 para 1.3s (mais suave)
                ease: 'elastic.out(1, 0.6)' // Melhorado: bounce mais suave
            }, pipocaStart + (mobile ? 0.1 : 0.15)).to(firstTextFrame, {
                    scale: 1,
                duration: mobile ? 0.35 : 0.45, // Desktop: aumentado de 0.3 para 0.45s (mais suave)
                ease: 'power3.out' // Melhorado: mais suave // Melhorado: mais suave
            }, '>-0.12');
        }
        
        // Diálogo com pipoca
        if (firstDialogue) {
            initialTL.to(firstDialogue, {
                opacity: 1,
                scale: 1.05,
                y: 0,
                duration: mobile ? 0.9 : 1.2, // Desktop: aumentado de 0.8 para 1.2s (mais suave)
                ease: 'elastic.out(1, 0.65)' // Melhorado: bounce mais suave
            }, pipocaStart + (mobile ? 0.2 : 0.25)).to(firstDialogue, {
                scale: 1,
                duration: mobile ? 0.25 : 0.4, // Desktop: aumentado de 0.2 para 0.4s (mais suave)
                ease: 'power3.out' // Melhorado: mais suave // Melhorado: mais suave
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
            
            // Direção alternada - MOBILE: alternar direita/esquerda a partir do slide 2
            // Slide 2 (index 1): vem da direita (slideFromLeft = false)
            // Slide 3 (index 2): vem da esquerda (slideFromLeft = true)
            // Slide 4 (index 3): vem da direita (slideFromLeft = false)
            // etc.
            let slideFromLeft;
            if (mobile) {
                // No mobile, alternar a partir do slide 2 (index 1)
                // index 1 (slide 2) = false (direita)
                // index 2 (slide 3) = true (esquerda)
                // index 3 (slide 4) = false (direita)
                slideFromLeft = (index - 1) % 2 === 1; // Alterna: false, true, false, true...
            } else {
                // Desktop mantém comportamento original
                slideFromLeft = index % 2 === 1;
            }
        
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
            
            // Timeline com ScrollTrigger - OTIMIZADO PARA MOBILE
            // Start: quando o topo da seção toca o topo do viewport (começa a entrar)
            const startValue = 'top bottom';
            
            // End: 'center center' é mais robusto que 'top center' no mobile
            // endTrigger garante que o ScrollTrigger use a seção correta para calcular o final
            const endValue = 'center center';
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                endTrigger: section, // CHAVE: Garante que o fim da animação use a seção correta
                start: startValue,
                end: endValue,
                // Scrub aumentado para reduzir crashes - mais suave no mobile
                // Slide 2 (index 1) tem scrub maior para reduzir puxões ao voltar para slide 1
                // Slide 3 (index 2) tem scrub EXTREMAMENTE maior para suavizar EXTREMAMENTE mais a animação
                scrub: mobile 
                    ? (index === 2 ? 6.0 : (index === 1 ? 2.0 : 1.5)) // Slide 3 EXTREMAMENTE mais suave (6.0), Slide 2 (2.0), outros (1.5)
                    : 1.2,
                invalidateOnRefresh: true,
                preventOverlaps: true,
                markers: false, // Desabilitar markers para melhor performance
                anticipatePin: 1, // Antecipar pin para suavidade
                // onLeaveBack simplificado - força timeline a voltar ao início
                onLeaveBack: () => {
                    // Usar requestAnimationFrame para suavizar a transição
                    requestAnimationFrame(() => {
                        tl.progress(0);
                    });
                },
                // onEnterBack - garante estado final correto ao rolar para baixo novamente
                onEnterBack: () => {
                    requestAnimationFrame(() => {
                        tl.progress(1);
                    });
                }
            }
        });
        
            // Painel - Duração simplificada para mobile
            // Slide 3 com duração EXTREMAMENTE maior e easing EXTREMAMENTE mais suave
            const panelDuration = mobile 
                ? (index === 2 ? 2.5 : 1.0) // Slide 3: 2.5s (EXTREMAMENTE mais lento e suave - era 1.8s)
                : 1.4; // Desktop: aumentado de 0.8 para 1.4s (mais suave)
            const panelEase = mobile && index === 2 
                ? 'power3.out' // Slide 3: easing melhorado (power3.out - mais suave)
                : (mobile ? 'power3.out' : 'expo.out'); // Melhorado: power3.out para mobile, expo.out para desktop
                
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
                // Sincronizar início: slide 3 começa bem depois para suavizar EXTREMAMENTE mais
                const imageStartTime = mobile 
                    ? (index === 2 ? 0.5 : 0.25) // Slide 3: 0.5s (EXTREMAMENTE mais espaçado - era 0.4s), outros em 0.25
                    : 0.35; // Desktop: aumentado de 0.25 para 0.35s (mais espaçado e suave)
                    
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
                    
                // Imagem - Duração simplificada
                // Slide 3 com duração EXTREMAMENTE maior mas mantendo efeito de pipoca (elastic)
                const imageDuration = mobile 
                    ? (index === 2 ? 2.8 : 1.1) // Slide 3: 2.8s (EXTREMAMENTE mais lento e suave - era 2.0s)
                    : 1.5; // Desktop: aumentado de 0.9 para 1.5s (mais suave)
                const imageEase = mobile && index === 2 
                    ? 'elastic.out(1, 0.4)' // Slide 3: efeito de pipoca melhorado (0.4 para bounce mais refinado)
                    : 'elastic.out(1, 0.5)'; // Melhorado: bounce mais refinado
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
                scale: mobile && index === 2 ? 1.15 : 1, // Slide 3: não diminui tanto (1.15 ao invés de 1)
                duration: mobile && index === 2 ? 1.8 : (mobile ? 0.5 : 0.6), // Desktop: aumentado de 0.35 para 0.6s (mais suave)
                ease: 'power3.out' // Melhorado: mais suave // Melhorado: mais suave
            }, '>-0.15');
        }
            
            // Texto - SLIDE 3 MAIS EVIDENTE NO MOBILE
        if (textFrame) {
                // Sincronizar início: slide 3 começa bem depois para suavizar EXTREMAMENTE mais
                const textStartTime = mobile 
                    ? (index === 2 ? 0.5 : 0.25) // Slide 3: 0.5s (EXTREMAMENTE mais espaçado - era 0.4s), outros em 0.25
                    : 0.35; // Desktop: aumentado de 0.25 para 0.35s (mais espaçado e suave)
                    
                // Slide 3: valores iniciais MUITO mais extremos (efeito leque)
                const textFromScale = mobile && index === 2 ? 0.3 : 0.8; // Slide 3: 0.3 (muito menor)
                const textFromY = mobile 
                    ? (index === 2 ? 70 : (30 + (index - 1) * 5)) // Slide 3: 70px
                    : 50;
                const textFromX = mobile && index === 2 
                    ? (slideFromLeft ? -80 : 80) // Slide 3: MUITO mais distante lateralmente
                    : (slideFromLeft ? -30 : 30);
                    
                // Texto - Duração simplificada
                // Slide 3 com duração EXTREMAMENTE maior e easing melhorado
                const textBounce = mobile && index === 2 ? 0.8 : 0.6; // Slide 3: bounce melhorado (0.8 - mais refinado)
                const textDuration = mobile 
                    ? (index === 2 ? 2.2 : 1.0) // Slide 3: 2.2s (EXTREMAMENTE mais lento e suave - era 1.6s)
                    : 1.3; // Desktop: aumentado de 0.8 para 1.3s (mais suave)
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
                duration: mobile && index === 2 ? 1.5 : (mobile ? 0.3 : 0.4), // Desktop: aumentado de 0.2 para 0.4s (mais suave)
                ease: 'power3.out' // Melhorado: mais suave // Melhorado: mais suave
            }, '>-0.12');
        }
            
            // Diálogo
            // Diálogo - SLIDE 3 MAIS EVIDENTE NO MOBILE
            if (dialogue) {
                // Sincronizar início: slide 3 começa MUITO depois para suavizar EXTREMAMENTE mais
                const dialogueStartTime = mobile 
                    ? (index === 2 ? 0.8 : 0.35) // Slide 3: 0.8s (EXTREMAMENTE mais espaçado - era 0.6s), outros em 0.35
                    : 0.35; // Desktop também sincronizado
                // Diálogo - Duração simplificada
                // Slide 3 com duração EXTREMAMENTE maior e easing EXTREMAMENTE mais suave
                const dialogueDuration = mobile 
                    ? (index === 2 ? 2.0 : 0.8) // Slide 3: 2.0s (EXTREMAMENTE mais lento e suave - era 1.4s)
                    : 1.2; // Desktop: aumentado de 0.7 para 1.2s (mais suave)
                const dialogueEase = mobile && index === 2 
                    ? 'power3.out' // Slide 3: easing melhorado (power3.out - mais suave)
                    : (mobile ? 'power2.out' : 'expo.out'); // Melhorado: power2.out para mobile, expo.out para desktop
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
        // Header removido - não precisa calcular headerHeight
        const headerHeight = 0;
        
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
                duration: mobile ? 0.4 : 0.8, // Desktop: aumentado de 0.5 para 0.8s (mais suave)
                ease: 'expo.out' // Melhorado: easing muito suave e dramático
            },
            0
        )
        // Segundo: volta com bounce (efeito de rebote de HQ)
            .to(logoFinal, {
            scale: 0.9,
            rotation: mobile ? -8 : -6,
            x: mobile ? -4 : -5,
            duration: mobile ? 0.3 : 0.5, // Desktop: aumentado de 0.35 para 0.5s (mais suave)
            ease: 'power3.out' // Melhorado: mais suave
        }, '>-0.1')
        // Terceiro: oscilação final (efeito de estabilização)
            .to(logoFinal, {
                scale: 1.05,
            rotation: mobile ? 3 : 2,
            x: mobile ? 2 : 2.5,
            duration: mobile ? 0.25 : 0.45, // Desktop: aumentado de 0.3 para 0.45s (mais suave)
            ease: 'power2.out' // Melhorado: mais suave
        }, '>-0.08')
        // Quarto: normalização final
            .to(logoFinal, {
                scale: 1,
                rotation: 0,
            x: 0,
            duration: mobile ? 0.3 : 0.5, // Desktop: aumentado de 0.35 para 0.5s (mais suave)
            ease: 'power2.out' // Melhorado: mais suave
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
                duration: mobile ? 0.5 : 0.9, // Desktop: aumentado de 0.6 para 0.9s (mais suave)
                ease: 'back.out(1.5)' // Melhorado: easing com bounce mais refinado
            },
            mobile ? 0.6 : 0.7 // Começa durante a oscilação do logo
        )
        // Normalização da frase
        .to(fraseFinal, {
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            duration: mobile ? 0.3 : 0.5, // Desktop: aumentado de 0.35 para 0.5s (mais suave)
            ease: 'power2.out' // Melhorado: mais suave
        }, '>-0.1');
        
        // Configurar ScrollTrigger DEPOIS de criar toda a timeline
        // OTIMIZADO PARA MOBILE
        ScrollTrigger.create({
            trigger: section8,
            endTrigger: section8, // Garante que o fim use a seção correta
            start: 'top bottom', // Começa quando entra na tela
            end: 'center center', // Mais robusto que 'top center' no mobile
            scrub: mobile ? 2.0 : 1.5, // Aumentado para reduzir crashes
            animation: tl8, // Usar timeline criada
            invalidateOnRefresh: true, // Garantir recálculo suave
            anticipatePin: 1, // Antecipar pin para suavidade
            markers: false, // Desabilitar markers para melhor performance
            // Callbacks simplificados com requestAnimationFrame
            onLeaveBack: () => {
                requestAnimationFrame(() => {
                    tl8.progress(0);
                });
            },
            onEnterBack: () => {
                requestAnimationFrame(() => {
                    tl8.progress(1);
                });
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
        
        // BLOQUEAR SCROLL DE FORMA MENOS AGRESSIVA (apenas CSS)
        // Removido bloqueio por eventos (wheel, touchmove, scroll) para evitar conflitos no mobile
        // Mantendo apenas o controle de overflow-y no documentElement, que é mais seguro
        document.documentElement.style.setProperty('overflow-y', 'hidden', 'important');
        let scrollBlocked = true; // Mantido para consistência
        
        // Função para habilitar scroll (Simplificada - sem remoção de listeners)
        const enableScroll = () => {
            scrollBlocked = false;
            document.documentElement.style.setProperty('overflow-y', 'auto', 'important');
        };
        
        // HEADER REMOVIDO - Iniciar direto com slide 1
        // SEQUÊNCIA: Slide 1 -> Habilitar Scroll -> Outros Slides
        // Aguardar um pequeno delay para garantir que tudo está pronto
        setTimeout(() => {
            // Pular animação do header - iniciar direto com slide 1
            const slide1Data = animateFirstSlide(() => {
                // Slide 1 terminou, AGORA habilitar scroll
                enableScroll();
                
                // CRUCIAL: Habilitar o ScrollTrigger após o scroll ser liberado
                setTimeout(() => {
                    // AGORA configurar outros slides (após scroll habilitado)
                    animateSubsequentSlides();
                    animateFinalSlide();
                    animateFooter();
                    
                    // Refresh ScrollTrigger com múltiplos requestAnimationFrame para maior estabilidade
                    // Isso garante que o DOM se estabilize completamente antes do refresh
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            if (typeof ScrollTrigger !== 'undefined') {
                                // Atualizar viewport height antes do refresh
                                setTrueVHeight();
                                ScrollTrigger.refresh(true); // Força recálculo completo
                            }
                        });
                    });
                }, 150); // Aumentado de 100 para 150ms para maior estabilidade
            });
            
            // Tornar seção visível e executar animação IMEDIATAMENTE
            if (slide1Data && slide1Data.timeline && slide1Data.section) {
                const section = slide1Data.section;
                
                // PRIMEIRO: Tornar seção visível ANTES de qualquer coisa
                section.style.setProperty('display', 'flex', 'important');
                section.style.setProperty('visibility', 'visible', 'important');
                section.style.setProperty('opacity', '1', 'important');
                section.style.setProperty('justify-content', 'center', 'important');
                section.style.setProperty('align-items', 'center', 'important');
                
                // Também usar GSAP para garantir
                gsap.set(section, { 
                    display: 'flex',
                    visibility: 'visible',
                    opacity: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    immediateRender: true
                });
                
                // Executar animação IMEDIATAMENTE após tornar visível
                // Usar pequeno delay para garantir que o DOM atualizou
                setTimeout(() => {
                    if (slide1Data.timeline) {
                        slide1Data.timeline.play();
                    }
                }, 50);
            } else {
                console.error('Slide 1 data não encontrado ou incompleto:', slide1Data);
            }
        }, 100);
    }
    
    // ============================================
    // RESIZE HANDLER (MELHORADO)
    // ============================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Atualizar altura do viewport
            setTrueVHeight();
            scrollToTop();
            // Header removido - não precisa mais setupHeader()
            if (typeof ScrollTrigger !== 'undefined') {
                // Usar requestAnimationFrame para maior precisão de renderização
                requestAnimationFrame(() => {
                    ScrollTrigger.refresh(true); // Forçar recálculo completo
                });
            }
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
