// Función para crear StarBorder (adaptado a vanilla JS)
export function createStarBorder(element, options = {}) {
    const {
        color = 'cyan',
        speed = '6s',
        thickness = 1
    } = options;

    // Crear contenedor
    const container = document.createElement('div');
    container.className = 'star-border-container';
    container.style.padding = `${thickness}px 0`;

    // Crear gradientes
    const gradientBottom = document.createElement('div');
    gradientBottom.className = 'border-gradient-bottom';
    gradientBottom.style.background = `radial-gradient(circle, ${color}, transparent 10%)`;
    gradientBottom.style.animationDuration = speed;

    const gradientTop = document.createElement('div');
    gradientTop.className = 'border-gradient-top';
    gradientTop.style.background = `radial-gradient(circle, ${color}, transparent 10%)`;
    gradientTop.style.animationDuration = speed;

    // Crear contenido interno
    const innerContent = document.createElement('div');
    innerContent.className = 'inner-content';

    // Mover el contenido del elemento original al inner-content
    while (element.firstChild) {
        innerContent.appendChild(element.firstChild);
    }

    // Copiar clases del elemento original
    if (element.className) {
        innerContent.className += ' ' + element.className;
    }

    // Copiar atributos del elemento original al contenedor
    Array.from(element.attributes).forEach(attr => {
        if (attr.name !== 'class' && attr.name !== 'style') {
            container.setAttribute(attr.name, attr.value);
        }
    });

    // Copiar estilos inline del elemento original al inner-content
    if (element.style.cssText) {
        innerContent.style.cssText = element.style.cssText;
    }
    
    // Asegurar que el inner-content tenga los estilos del botón
    try {
        const computedStyle = window.getComputedStyle(element);
        
        // Copiar todos los estilos importantes
        innerContent.style.width = computedStyle.width || '100%';
        innerContent.style.height = computedStyle.height || '64px';
        innerContent.style.background = computedStyle.background || 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)';
        innerContent.style.color = computedStyle.color || '#0F172A';
        innerContent.style.fontSize = computedStyle.fontSize || '1.1rem';
        innerContent.style.fontWeight = computedStyle.fontWeight || '600';
        innerContent.style.borderRadius = computedStyle.borderRadius || '50px';
        innerContent.style.border = 'none';
        innerContent.style.display = 'flex';
        innerContent.style.alignItems = 'center';
        innerContent.style.justifyContent = 'center';
        innerContent.style.letterSpacing = computedStyle.letterSpacing || '2px';
        innerContent.style.textTransform = computedStyle.textTransform || 'uppercase';
        innerContent.style.fontFamily = computedStyle.fontFamily || "'Syne', sans-serif";
        innerContent.style.cursor = 'pointer';
        innerContent.style.transition = 'all 0.3s ease';
        innerContent.style.boxShadow = computedStyle.boxShadow || '0 4px 20px rgba(56, 189, 248, 0.3)';
        innerContent.style.margin = '0';
        innerContent.style.padding = computedStyle.padding || '0';
        
        // Agregar hover effect
        innerContent.addEventListener('mouseenter', () => {
            innerContent.style.transform = 'scale(1.02)';
            innerContent.style.boxShadow = '0 8px 30px rgba(56, 189, 248, 0.5)';
        });
        
        innerContent.addEventListener('mouseleave', () => {
            innerContent.style.transform = 'scale(1)';
            innerContent.style.boxShadow = computedStyle.boxShadow || '0 4px 20px rgba(56, 189, 248, 0.3)';
        });
        
        innerContent.addEventListener('mousedown', () => {
            innerContent.style.transform = 'scale(0.98)';
        });
        
        innerContent.addEventListener('mouseup', () => {
            innerContent.style.transform = 'scale(1.02)';
        });
    } catch (error) {
        console.warn('Error copiando estilos:', error);
    }

    // Construir estructura
    container.appendChild(gradientBottom);
    container.appendChild(gradientTop);
    container.appendChild(innerContent);

    // Reemplazar elemento original
    element.parentNode.replaceChild(container, element);

    return container;
}

