// LOADER DE SEGURANÇA - LÓGICA
(function() {
    'use strict';
    
    // BLOQUEAR SCROLL IMEDIATAMENTE
    document.body.classList.add('loader-active');
    
    let progress = 0;
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const statusText = document.getElementById('status-text');
    const icons = [
        document.getElementById('icon-1'),
        document.getElementById('icon-2'),
        document.getElementById('icon-3'),
        document.getElementById('icon-4'),
        document.getElementById('icon-5')
    ];
    
    const statusMessages = [
        'Verificando credenciais...',
        'Ativando proteção de dados...',
        'Configurando autenticação...',
        'Carregando protocolos de segurança...',
        'Finalizando verificações...'
    ];
    
    function updateProgress() {
        if (progress < 100) {
            // Incremento variável para parecer mais realista (reduzido para ser mais lento)
            const increment = Math.random() * 1.5 + 1;
            progress = Math.min(progress + increment, 100);
            
            progressBar.style.width = progress + '%';
            progressText.textContent = Math.floor(progress);
            
            // Ativar ícones progressivamente
            const iconIndex = Math.floor(progress / 20);
            if (iconIndex < icons.length && icons[iconIndex]) {
                icons[iconIndex].classList.remove('text-gray-600');
                icons[iconIndex].classList.add('text-blue-500', 'scale-110', 'drop-shadow-lg', 'active');
                icons[iconIndex].style.filter = 'drop-shadow(0 0 10px rgba(9, 86, 247, 0.7))';
            }
            
            // Atualizar mensagem de status
            const messageIndex = Math.floor(progress / 20);
            if (messageIndex < statusMessages.length) {
                statusText.textContent = statusMessages[messageIndex];
            }
            
            setTimeout(updateProgress, 50);
        } else {
            // Progresso completo
            progress = 100;
            progressBar.style.width = '100%';
            progressText.textContent = '100';
            statusText.textContent = 'Pronto! Abrindo...';
            
            // Todos os ícones ativos
            icons.forEach(icon => {
                if (icon) {
                    icon.classList.remove('text-gray-600', 'text-blue-500', 'active');
                    icon.classList.add('text-green-500', 'scale-110', 'complete');
                    icon.style.filter = 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.7))';
                }
            });
            
            // Remover loader após animação
            setTimeout(() => {
                const loader = document.getElementById('security-loader');
                if (loader) {
                    loader.classList.add('loader-fade-out');
                    setTimeout(() => {
                        loader.remove();
                        
                        // HABILITAR SCROLL AGORA
                        document.body.classList.remove('loader-active');
                        
                        // INICIAR SCRIPT PRINCIPAL SOMENTE APÓS LOADER REMOVER
                        // Disparar evento customizado para script.js iniciar
                        window.dispatchEvent(new Event('loaderComplete'));
                    }, 500);
                }
            }, 500);
        }
    }
    
    // Iniciar progresso após pequeno delay
    setTimeout(updateProgress, 300);
})();
