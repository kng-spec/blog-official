const fs = require('fs');
const path = require('path');

// 修复Pagefind搜索结果链接的脚本
function fixPagefindLinks() {
    console.log('开始修复Pagefind搜索结果链接...');
    
    // 创建或修改pagefind-modular-ui.js来修复链接
    const modularUIPath = '_pagefind/pagefind-modular-ui.js';
    
    if (fs.existsSync(modularUIPath)) {
        let content = fs.readFileSync(modularUIPath, 'utf8');
        
        // 添加修复搜索结果链接的代码
        const fixCode = `
// 修复Pagefind搜索结果链接
(function() {
    const originalCreateLink = window.createLink || function(url) { return url; };
    window.createLink = function(url) {
        if (url && !url.startsWith('/') && !url.startsWith('http') && !url.includes('post/')) {
            return '/post/' + url;
        }
        return originalCreateLink(url);
    };
    
    // 监听搜索结果生成
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    const links = node.querySelectorAll ? node.querySelectorAll('a[href]') : [];
                    links.forEach(function(link) {
                        const href = link.getAttribute('href');
                        if (href && !href.startsWith('/') && !href.startsWith('http') && !href.includes('post/')) {
                            link.setAttribute('href', '/post/' + href);
                        }
                    });
                }
            });
        });
    });
    
    // 当Pagefind初始化完成后开始监听
    window.addEventListener('load', function() {
        setTimeout(function() {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }, 1000);
    });
})();`;

        // 在文件末尾添加修复代码
        if (!content.includes('修复Pagefind搜索结果链接')) {
            content += fixCode;
            fs.writeFileSync(modularUIPath, content);
            console.log(`已更新 ${modularUIPath}`);
        }
    }
    
    // 同时在index.html中添加修复脚本
    const indexPath = 'index.html';
    if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf8');
        
        const fixScript = `
    <!-- 修复Pagefind搜索结果链接 -->
    <script>
        // 修复搜索结果中的相对链接
        document.addEventListener('DOMContentLoaded', function() {
            // 延迟执行，确保Pagefind已经加载
            setTimeout(function() {
                // 查找所有搜索结果链接并修复路径
                function fixSearchLinks() {
                    const links = document.querySelectorAll('.pagefind-ui__result-link, a[href*=".html"]');
                    links.forEach(function(link) {
                        const href = link.getAttribute('href');
                        if (href && !href.startsWith('/') && !href.startsWith('http') && !href.includes('post/')) {
                            console.log('修复链接:', href, '->', '/post/' + href);
                            link.setAttribute('href', '/post/' + href);
                        }
                    });
                }
                
                // 立即修复一次
                fixSearchLinks();
                
                // 监听搜索结果变化
                const searchContainer = document.querySelector('#pagefind-search');
                if (searchContainer) {
                    const observer = new MutationObserver(function(mutations) {
                        mutations.forEach(function(mutation) {
                            if (mutation.type === 'childList') {
                                setTimeout(fixSearchLinks, 100);
                            }
                        });
                    });
                    
                    observer.observe(searchContainer, {
                        childList: true,
                        subtree: true
                    });
                }
                
                // 监听搜索输入
                const searchInput = document.querySelector('.pagefind-ui__search-input');
                if (searchInput) {
                    searchInput.addEventListener('input', function() {
                        setTimeout(fixSearchLinks, 500);
                    });
                }
            }, 1000);
        });
    </script>`;
        
        // 在Pagefind初始化脚本之前插入修复脚本
        const pagefindScriptPattern = /<!-- Pagefind 搜索.*?<\/script>/s;
        if (pagefindScriptPattern.test(content) && !content.includes('修复Pagefind搜索结果链接')) {
            content = content.replace(pagefindScriptPattern, fixScript + '\n    $&');
            fs.writeFileSync(indexPath, content);
            console.log(`已更新 ${indexPath}`);
        }
    }
    
    console.log('修复完成！');
}

fixPagefindLinks();