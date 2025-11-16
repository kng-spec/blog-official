// 简单直接的Pagefind搜索结果链接修复脚本
document.addEventListener('DOMContentLoaded', function() {
    // 延迟执行，确保Pagefind已经加载并渲染了搜索结果
    setTimeout(function() {
        
        // 修复搜索结果中的相对链接的函数
        function fixSearchLinks() {
            console.log('正在修复搜索结果链接...');
            
            // 查找所有可能的搜索结果链接
            const linkSelectors = [
                '.pagefind-ui__result-link',  // Pagefind默认的搜索结果链接类
                'a[href*=".html"]',           // 所有指向HTML文件的链接
                'a[href]:not([href^="/"]):not([href^="http"]):not([href*="post/"])'  // 相对链接且不包含post/
            ];
            
            let fixedCount = 0;
            
            linkSelectors.forEach(function(selector) {
                const links = document.querySelectorAll(selector);
                links.forEach(function(link) {
                    const href = link.getAttribute('href');
                    if (href && !href.startsWith('/') && !href.startsWith('http') && !href.includes('post/')) {
                        const newHref = '/post/' + href;
                        console.log('修复链接:', href, '->', newHref);
                        link.setAttribute('href', newHref);
                        fixedCount++;
                    }
                });
            });
            
            console.log(`共修复了 ${fixedCount} 个链接`);
        }
        
        // 立即修复一次
        fixSearchLinks();
        
        // 监听搜索容器中的变化
        const searchContainer = document.querySelector('#pagefind-search') || document.body;
        if (searchContainer) {
            const observer = new MutationObserver(function(mutations) {
                let shouldFix = false;
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        // 检查是否有新的链接元素被添加
                        for (let node of mutation.addedNodes) {
                            if (node.nodeType === 1 && (node.tagName === 'A' || node.querySelector('a'))) {
                                shouldFix = true;
                                break;
                            }
                        }
                    }
                });
                
                if (shouldFix) {
                    setTimeout(fixSearchLinks, 100); // 延迟一点确保DOM完全更新
                }
            });
            
            observer.observe(searchContainer, {
                childList: true,
                subtree: true
            });
            
            console.log('已设置MutationObserver监听搜索结果变化');
        }
        
        // 监听搜索输入
        const searchInput = document.querySelector('.pagefind-ui__search-input, input[type="search"]');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                setTimeout(fixSearchLinks, 800); // 等待搜索结果加载完成
            });
            
            searchInput.addEventListener('keyup', function() {
                setTimeout(fixSearchLinks, 800);
            });
            
            console.log('已设置搜索输入监听');
        }
        
        // 定期检查并修复链接（备用方案）
        setInterval(fixSearchLinks, 2000);
        
    }, 2000); // 延迟2秒执行
});

console.log('Pagefind搜索结果链接修复脚本已加载');