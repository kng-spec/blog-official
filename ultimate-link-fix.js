// 终极链接修复解决方案
(function() {
    'use strict';
    
    console.log('启动终极链接修复方案...');
    
    // 立即拦截所有链接点击事件
    document.addEventListener('click', function(event) {
        let target = event.target;
        
        // 找到最近的链接元素
        while (target && target.tagName !== 'A') {
            target = target.parentElement;
        }
        
        if (target && target.tagName === 'A') {
            const href = target.getAttribute('href');
            
            // 检查是否是相对HTML链接且缺少post前缀
            if (href && href.endsWith('.html') && 
                !href.startsWith('/') && 
                !href.startsWith('http') && 
                !href.includes('post/')) {
                
                const newHref = '/post/' + href;
                console.log('即时修复链接:', href, '->', newHref);
                
                // 阻止默认行为
                event.preventDefault();
                
                // 修复链接
                target.setAttribute('href', newHref);
                
                // 立即跳转到修复后的链接
                window.location.href = newHref;
            }
        }
    }, true); // 使用捕获阶段
    
    // 监听所有动态生成的链接
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) {
                    // 处理新添加的元素
                    processElement(node);
                }
            });
        });
    });
    
    function processElement(element) {
        // 如果是链接元素，直接处理
        if (element.tagName === 'A') {
            fixLink(element);
        }
        
        // 如果包含子元素，递归处理
        if (element.querySelectorAll) {
            const links = element.querySelectorAll('a[href*=".html"]');
            links.forEach(fixLink);
        }
    }
    
    function fixLink(link) {
        const href = link.getAttribute('href');
        if (href && href.endsWith('.html') && 
            !href.startsWith('/') && 
            !href.startsWith('http') && 
            !href.includes('post/')) {
            
            const newHref = '/post/' + href;
            console.log('修复动态链接:', href, '->', newHref);
            link.setAttribute('href', newHref);
        }
    }
    
    // 开始监听DOM变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // 立即处理现有页面中的所有链接
    function fixExistingLinks() {
        const links = document.querySelectorAll('a[href*=".html"]');
        links.forEach(fixLink);
        console.log(`已处理 ${links.length} 个现有链接`);
    }
    
    // 页面加载完成后修复现有链接
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixExistingLinks);
    } else {
        fixExistingLinks();
    }
    
    // 定期检查和修复（备用机制）
    setInterval(fixExistingLinks, 1000);
    
    console.log('终极链接修复方案已激活');
})();