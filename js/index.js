(function() {
    const IDENTITY_KEY = 'shulan_profile';

    function getProfile() {
        try {
            return JSON.parse(localStorage.getItem(IDENTITY_KEY));
        } catch {
            return null;
        }
    }

    function saveProfile(profile) {
        localStorage.setItem(IDENTITY_KEY, JSON.stringify(profile));
    }

    function renderIdentity() {
        const profile = getProfile();
        const section = document.getElementById('identitySection');
        const label = document.getElementById('roleLabel');
        const options = document.getElementById('roleOptions');
        const hint = document.getElementById('roleHint');
        const customInput = document.getElementById('customRoleInput');
        const bar = document.querySelector('.identity-bar');

        if (profile && profile.role) {
            section.classList.remove('first-visit');
            label.innerHTML = '当前身份：<strong>' + profile.role + '</strong>';

            let editBtn = bar.querySelector('.btn-edit');
            if (!editBtn) {
                editBtn = document.createElement('button');
                editBtn.className = 'btn-edit';
                editBtn.textContent = '✎ 修改';
                editBtn.onclick = function() {
                    options.style.display = 'flex';
                    hint.style.display = 'block';
                    customInput.style.display = 'none';
                    editBtn.style.display = 'none';
                    document.querySelectorAll('#roleOptions button').forEach(function(btn) {
                        btn.classList.remove('active');
                    });
                };
                bar.appendChild(editBtn);
            }

            editBtn.style.display = '';
            options.style.display = 'none';
            hint.style.display = 'none';
            customInput.style.display = 'none';
        } else {
            section.classList.add('first-visit');
            label.innerHTML = '👋 选择你的岗位（选填）';
            options.style.display = 'flex';
            hint.style.display = 'block';
            customInput.style.display = 'none';

            const oldEdit = bar.querySelector('.btn-edit');
            if (oldEdit) oldEdit.remove();
        }
    }

    function selectRole(role) {
        const profile = getProfile() || {};
        profile.role = role;
        profile.firstVisit = profile.firstVisit || new Date().toISOString();
        saveProfile(profile);
        renderIdentity();
    }

    document.querySelectorAll('#roleOptions button[data-role]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const role = this.dataset.role;
            if (role === '其他') return;

            selectRole(role);
            document.querySelectorAll('#roleOptions button').forEach(function(item) {
                item.classList.remove('active');
            });
            this.classList.add('active');
            document.getElementById('customRoleInput').style.display = 'none';
        });
    });

    const btnOther = document.getElementById('btnOther');
    const customInput = document.getElementById('customRoleInput');
    const customField = document.getElementById('customRoleField');

    if (btnOther) {
        btnOther.addEventListener('click', function() {
            if (customInput.style.display === 'none') {
                customInput.style.display = 'block';
                customField.focus();
                document.querySelectorAll('#roleOptions button').forEach(function(btn) {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            } else {
                customInput.style.display = 'none';
                this.classList.remove('active');
            }
        });
    }

    function saveCustomRole() {
        const val = customField.value.trim();
        if (val) {
            selectRole(val);
            customInput.style.display = 'none';
            btnOther.classList.remove('active');
        }
    }

    if (customField) {
        customField.addEventListener('blur', saveCustomRole);
        customField.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                this.blur();
            }
        });
    }

    const generateBtn = document.getElementById('generateBtn');
    const userInput = document.getElementById('userInput');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const outputArea = document.getElementById('outputArea');
    const outputA = document.getElementById('outputA');
    const outputB = document.getElementById('outputB');
    const outputC = document.getElementById('outputC');

    function generateReport(inputText) {
        const profile = getProfile();
        const role = (profile && profile.role) ? profile.role : '职场人';

        return new Promise(function(resolve) {
            const delay = 1500 + Math.random() * 1000;
            setTimeout(function() {
                const len = inputText.length;
                let dataVer, valueVer, simpleVer;
                if (len < 20) {
                    dataVer = '输入内容较少，建议补充具体工作事项。';
                    valueVer = '输入内容较少，建议补充具体工作事项。';
                    simpleVer = '输入内容较少，建议补充具体工作事项。';
                } else {
                    dataVer = '完成客户投诉处理1起，响应时效提升至2h内；主导完成项目汇报PPT迭代（V2.3）；协同设计团队推进界面方案评审，确保报告按期交付。';
                    valueVer = '以客户体验为切入点，优化投诉处理SOP；通过跨部门协作（设计/项目组）扫清汇报卡点，保障关键节点0延期。';
                    simpleVer = '① 投诉闭环 ② PPT定稿 ③ 跨部门对齐 ④ 报告交付';
                }
                resolve({
                    data: dataVer,
                    value: valueVer,
                    simple: simpleVer,
                    role: role
                });
            }, delay);
        });
    }

    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            const text = userInput.value.trim();
            if (!text) {
                alert('请先输入你的工作记录。');
                return;
            }

            generateBtn.disabled = true;
            generateBtn.textContent = '生成中…';
            loadingIndicator.classList.add('show');
            outputArea.style.display = 'none';

            generateReport(text).then(function(result) {
                outputA.textContent = result.data;
                outputA.className = 'card-body';
                outputB.textContent = result.value;
                outputB.className = 'card-body';
                outputC.textContent = result.simple;
                outputC.className = 'card-body';

                outputArea.style.display = 'block';
                loadingIndicator.classList.remove('show');
                generateBtn.disabled = false;
                generateBtn.textContent = '✨ 一键生成周报';

                document.querySelectorAll('.btn-copy').forEach(function(btn) {
                    btn.textContent = '📋 复制';
                    btn.classList.remove('copied');
                });

                outputArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }).catch(function(err) {
                alert('生成失败，请稍后重试。');
                loadingIndicator.classList.remove('show');
                generateBtn.disabled = false;
                generateBtn.textContent = '✨ 一键生成周报';
                console.error(err);
            });
        });
    }

    document.querySelectorAll('.btn-copy').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const targetEl = document.getElementById(targetId);
            if (!targetEl) return;
            const text = targetEl.textContent;
            if (!text || text.includes('点击生成')) {
                alert('暂无内容可复制，请先生成周报。');
                return;
            }
            copyText(text, this);
        });
    });

    renderIdentity();

    console.log('🦥 树懒 · 替你写周报 已加载');
    console.log('💡 慢慢来，不焦虑。');
})();
