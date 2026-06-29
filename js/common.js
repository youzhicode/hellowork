// ============================================================
// 登录弹窗
// ============================================================
(function() {
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const loginPanel = document.getElementById('loginPanel');
    const registerPanel = document.getElementById('registerPanel');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const modalTitle = document.getElementById('modalTitle');
    const modalSub = document.getElementById('modalSub');

    if (!loginModal) return;

    function openLogin() {
        loginPanel.style.display = 'block';
        registerPanel.style.display = 'none';
        modalTitle.textContent = '登录';
        modalSub.textContent = '登录后，你的周报记录将保存在云端';
        loginModal.classList.add('open');
    }

    function openRegister() {
        loginPanel.style.display = 'none';
        registerPanel.style.display = 'block';
        modalTitle.textContent = '注册';
        modalSub.textContent = '用邮箱注册，完成确认后即可使用';
        loginModal.classList.add('open');
    }

    if (loginBtn) loginBtn.addEventListener('click', openLogin);

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', function() {
            loginModal.classList.remove('open');
        });
    }

    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) loginModal.classList.remove('open');
    });

    if (switchToRegister) switchToRegister.addEventListener('click', openRegister);
    if (switchToLogin) switchToLogin.addEventListener('click', openLogin);

    // 登录提交
    const loginSubmit = document.getElementById('loginSubmitBtn');
    if (loginSubmit) {
        loginSubmit.addEventListener('click', function() {
            const email = document.getElementById('loginEmail').value.trim();
            const pwd = document.getElementById('loginPassword').value.trim();
            if (!email || !pwd) {
                alert('请填写完整信息。');
                return;
            }
            alert('登录功能将在接入后端后生效，当前为演示界面。');
        });
    }

    // 注册提交
    const registerSubmit = document.getElementById('registerSubmitBtn');
    if (registerSubmit) {
        registerSubmit.addEventListener('click', function() {
            const email = document.getElementById('registerEmail').value.trim();
            const pwd = document.getElementById('registerPassword').value.trim();
            const confirm = document.getElementById('registerPasswordConfirm').value.trim();
            if (!email || !pwd || !confirm) {
                alert('请填写完整信息。');
                return;
            }
            if (pwd.length < 8) {
                alert('密码至少8位。');
                return;
            }
            if (pwd !== confirm) {
                alert('两次密码不一致。');
                return;
            }
            alert('注册功能将在接入后端后生效，当前为演示界面。\n（正式版会发送确认邮件到你的邮箱）');
        });
    }

    // Enter 键提交
    document.querySelectorAll('#loginModal input').forEach(function(inp) {
        inp.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const panel = this.closest('#loginPanel') || this.closest('#registerPanel');
                if (panel && panel.id === 'loginPanel') {
                    const btn = document.getElementById('loginSubmitBtn');
                    if (btn) btn.click();
                } else if (panel && panel.id === 'registerPanel') {
                    const btn = document.getElementById('registerSubmitBtn');
                    if (btn) btn.click();
                }
            }
        });
    });
})();

// ============================================================
// 复制功能（通用）
// ============================================================
function copyText(text, btn, successMsg) {
    successMsg = successMsg || '✅ 已复制';
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
            if (btn) {
                btn.textContent = successMsg;
                btn.classList.add('copied');
                setTimeout(function() {
                    btn.textContent = btn.dataset.originalText || '📋 复制';
                    btn.classList.remove('copied');
                }, 2000);
            }
        }).catch(function() {
            fallbackCopyText(text, btn, successMsg);
        });
    } else {
        fallbackCopyText(text, btn, successMsg);
    }
}

function fallbackCopyText(text, btn, successMsg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        if (btn) {
            btn.textContent = successMsg;
            btn.classList.add('copied');
            setTimeout(function() {
                btn.textContent = btn.dataset.originalText || '📋 复制';
                btn.classList.remove('copied');
            }, 2000);
        }
    } catch (e) {
        alert('复制失败，请手动复制。');
    }
    document.body.removeChild(ta);
}