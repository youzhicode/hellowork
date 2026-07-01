(function() {
    const allWeeklyRecords = [
        { id: 1, year: 2026, week: 25, date: '2026-06-20', summary: '完成客户投诉处理、PPT迭代、跨部门协作', versions: { data: '完成客户投诉处理1起，响应时效提升至2h内；主导完成项目汇报PPT迭代（V2.3）；协同设计团队推进界面方案评审，确保报告按期交付。', value: '以客户体验为切入点，优化投诉处理SOP；通过跨部门协作（设计/项目组）扫清汇报卡点，保障关键节点0延期。', simple: '① 投诉闭环 ② PPT定稿 ③ 跨部门对齐 ④ 报告交付' } },
        { id: 2, year: 2026, week: 24, date: '2026-06-13', summary: '推进项目A需求评审、优化登录流程、修复线上bug', versions: { data: '推进项目A需求评审1轮，收集需求变更12项；优化登录流程，页面加载速度提升20%；修复线上bug3个，系统稳定性提升。', value: '通过需求评审提前识别风险；优化登录体验提升用户满意度；及时修复bug保障业务连续性。', simple: '① 需求评审完成 ② 登录优化 ③ Bug修复 ④ 上线验证' } },
        { id: 3, year: 2026, week: 23, date: '2026-06-06', summary: '完成Q2季度复盘报告、团队建设、客户回访', versions: { data: '完成Q2季度复盘报告1份，覆盖4个项目；组织团队建设活动1次，参与率95%；完成客户回访12家，满意度评分4.8/5。', value: '通过季度复盘提炼方法论；团队建设增强凝聚力；客户回访收集需求驱动产品迭代。', simple: '① Q2复盘 ② 团建 ③ 客户回访 ④ 需求整理' } },
        { id: 4, year: 2026, week: 22, date: '2026-05-30', summary: '对接新客户需求、原型设计、开发排期', versions: { data: '对接新客户3家，梳理需求文档1份；完成原型设计2个页面；制定开发排期计划1份，覆盖4个迭代。', value: '通过客户对接拓展业务渠道；原型设计加速需求确认；排期规划保障项目有序推进。', simple: '① 客户对接 ② 原型设计 ③ 排期规划 ④ 需求评审' } },
        { id: 5, year: 2026, week: 21, date: '2026-05-23', summary: '数据看板开发、用户调研、竞品分析', versions: { data: '完成数据看板开发3个模块，覆盖核心指标12项；完成用户调研50份，有效回收率85%；完成竞品分析报告1份，覆盖5款产品。', value: '数据看板提升决策效率；用户调研驱动产品优化；竞品分析识别市场机会。', simple: '① 数据看板 ② 用户调研 ③ 竞品分析 ④ 汇报' } },
        { id: 6, year: 2026, week: 20, date: '2026-05-16', summary: '系统重构、性能优化、文档编写', versions: { data: '完成系统重构核心模块3个，代码精简30%；性能优化后响应时间缩短40%；编写技术文档5份，覆盖全部核心接口。', value: '系统重构提升可维护性；性能优化改善用户体验；文档沉淀团队知识资产。', simple: '① 模块重构 ② 性能优化 ③ 文档编写 ④ 团队培训' } },
        { id: 7, year: 2026, week: 19, date: '2026-05-09', summary: '需求评审、开发排期、跨部门协调', versions: { data: '主导需求评审会议2场，通过需求8项；制定开发排期1份，覆盖6人团队；跨部门协调会议3次，解决依赖问题5项。', value: '需求评审保障产品方向正确；排期管理提升交付效率；跨部门协调扫清协作障碍。', simple: '① 需求评审 ② 排期制定 ③ 跨部门对齐 ④ 启动开发' } },
        { id: 8, year: 2026, week: 18, date: '2026-05-02', summary: '节日保障、应急响应、客户支持', versions: { data: '完成节日期间系统保障值班3天，处理应急事件2起，响应时效15分钟内；客户支持服务满意度100%。', value: '节日保障确保业务连续性；应急响应机制验证有效；客户支持提升品牌信任度。', simple: '① 值班保障 ② 应急处理 ③ 客户支持 ④ 总结汇报' } }
    ];

    const allMonthlyRecords = [
        { id: 1, year: 2026, month: 6, date: '2026-06-30', summary: '项目A上线、DAU提升15%、团队扩招2人', versions: { data: '6月完成项目A正式上线，DAU环比提升15%；完成团队扩招2人，补充技术力量；客户满意度从4.2提升至4.6。', value: '项目A上线标志着Q2核心目标达成；用户增长验证产品价值；团队扩张为下半年储备力量。', simple: '① 项目A上线 ② DAU+15% ③ 扩招2人 ④ 满意度提升' } },
        { id: 2, year: 2026, month: 5, date: '2026-05-31', summary: 'Q2里程碑达成、客户留存率提升、产品迭代', versions: { data: '5月达成Q2里程碑3项，进度完成率95%；客户留存率从78%提升至85%；完成产品迭代2个版本，上线功能12项。', value: '里程碑达成体现团队执行力；留存率提升验证产品粘性；快速迭代保持市场竞争力。', simple: '① 里程碑达成 ② 留存率+7% ③ 版本迭代 ④ 数据复盘' } }
    ];

    const PAGE_SIZE = 5;
    let weeklyPage = 1;
    let monthlyPage = 1;

    function checkLoginStatus() {
        const prompt = document.getElementById('loginPrompt');
        const content = document.getElementById('profileContent');
        const token = localStorage.getItem('shulan_token');
        if (token) {
            prompt.style.display = 'none';
            content.style.display = 'block';
            loadUserData();
        } else {
            prompt.style.display = 'block';
            content.style.display = 'none';
        }
    }

    function loadUserData() {
        const userData = JSON.parse(localStorage.getItem('shulan_user') || 'null');
        if (userData) {
            document.getElementById('userEmail').textContent = userData.email || 'user@example.com';
            const role = userData.role || '';
            document.getElementById('userRoleDisplay').textContent = role || '未设置';
        }
        renderWeeklyList();
        renderMonthlyList();
    }

    function getWeekTitle(year, week) {
        return year + '年 第' + week + '周';
    }

    function getMonthTitle(year, month) {
        return year + '年 ' + month + '月';
    }

    function renderWeeklyList() {
        const container = document.getElementById('weeklyList');
        const pagination = document.getElementById('weeklyPagination');
        const total = allWeeklyRecords.length;
        const totalPages = Math.ceil(total / PAGE_SIZE) || 1;
        if (weeklyPage > totalPages) weeklyPage = totalPages;
        const start = (weeklyPage - 1) * PAGE_SIZE;
        const end = Math.min(start + PAGE_SIZE, total);
        const pageData = allWeeklyRecords.slice(start, end);

        if (total === 0) {
            container.innerHTML = '<div class="record-empty"><span>📭</span>暂无周报记录</div>';
            pagination.innerHTML = '';
            return;
        }

        container.innerHTML = pageData.map(function(record) {
            const title = getWeekTitle(record.year, record.week);
            return `
                <div class="record-item">
                    <div class="record-header" onclick="toggleWeekly(${record.id})">
                        <div class="record-info">
                            <div class="title">${title}</div>
                            <div class="meta">${record.date} · ${record.summary}</div>
                        </div>
                        <div class="record-actions">
                            <button class="btn-delete" onclick="event.stopPropagation();confirmDelete('weekly', ${record.id})">删除</button>
                            <span class="expand-icon" id="weeklyIcon_${record.id}">▼</span>
                        </div>
                    </div>
                    <div class="record-body" id="weeklyBody_${record.id}">
                        <div class="body-grid">
                            <div class="version-card">
                                <div class="v-title">📊 数据流版本</div>
                                <div class="v-sub">突出动作 + 结果</div>
                                <div class="v-content">${record.versions.data}</div>
                                <button class="btn-copy" onclick="copyText('${record.versions.data.replace(/'/g, "\\'")}', this)">📋 复制</button>
                            </div>
                            <div class="version-card">
                                <div class="v-title">💎 价值流版本</div>
                                <div class="v-sub">突出意义 + 影响</div>
                                <div class="v-content">${record.versions.value}</div>
                                <button class="btn-copy" onclick="copyText('${record.versions.value.replace(/'/g, "\\'")}', this)">📋 复制</button>
                            </div>
                            <div class="version-card">
                                <div class="v-title">⚡ 极简流版本</div>
                                <div class="v-sub">核心动作，每条一句话</div>
                                <div class="v-content">${record.versions.simple}</div>
                                <button class="btn-copy" onclick="copyText('${record.versions.simple.replace(/'/g, "\\'")}', this)">📋 复制</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        renderPagination(pagination, weeklyPage, totalPages, 'weekly');
    }

    function renderMonthlyList() {
        const container = document.getElementById('monthlyList');
        const pagination = document.getElementById('monthlyPagination');
        const total = allMonthlyRecords.length;
        const totalPages = Math.ceil(total / PAGE_SIZE) || 1;
        if (monthlyPage > totalPages) monthlyPage = totalPages;
        const start = (monthlyPage - 1) * PAGE_SIZE;
        const end = Math.min(start + PAGE_SIZE, total);
        const pageData = allMonthlyRecords.slice(start, end);

        if (total === 0) {
            container.innerHTML = '<div class="record-empty"><span>📭</span>暂无月报记录</div>';
            pagination.innerHTML = '';
            return;
        }

        container.innerHTML = pageData.map(function(record) {
            const title = getMonthTitle(record.year, record.month);
            return `
                <div class="record-item">
                    <div class="record-header" onclick="toggleMonthly(${record.id})">
                        <div class="record-info">
                            <div class="title">${title}</div>
                            <div class="meta">${record.date} · ${record.summary}</div>
                        </div>
                        <div class="record-actions">
                            <button class="btn-delete" onclick="event.stopPropagation();confirmDelete('monthly', ${record.id})">删除</button>
                            <span class="expand-icon" id="monthlyIcon_${record.id}">▼</span>
                        </div>
                    </div>
                    <div class="record-body" id="monthlyBody_${record.id}">
                        <div class="body-grid">
                            <div class="version-card">
                                <div class="v-title">📊 数据流版本</div>
                                <div class="v-sub">突出动作 + 结果</div>
                                <div class="v-content">${record.versions.data}</div>
                                <button class="btn-copy" onclick="copyText('${record.versions.data.replace(/'/g, "\\'")}', this)">📋 复制</button>
                            </div>
                            <div class="version-card">
                                <div class="v-title">💎 价值流版本</div>
                                <div class="v-sub">突出意义 + 影响</div>
                                <div class="v-content">${record.versions.value}</div>
                                <button class="btn-copy" onclick="copyText('${record.versions.value.replace(/'/g, "\\'")}', this)">📋 复制</button>
                            </div>
                            <div class="version-card">
                                <div class="v-title">⚡ 极简流版本</div>
                                <div class="v-sub">核心动作，每条一句话</div>
                                <div class="v-content">${record.versions.simple}</div>
                                <button class="btn-copy" onclick="copyText('${record.versions.simple.replace(/'/g, "\\'")}', this)">📋 复制</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        renderPagination(pagination, monthlyPage, totalPages, 'monthly');
    }

    function renderPagination(container, current, total, type) {
        if (total <= 1) {
            container.innerHTML = '';
            return;
        }
        let html = '';
        html += `<button onclick="goToPage('${type}', ${current - 1})" ${current <= 1 ? 'disabled' : ''}>上一页</button>`;
        for (let i = 1; i <= total; i++) {
            html += i === current ? `<button class="active" disabled>${i}</button>` : `<button onclick="goToPage('${type}', ${i})">${i}</button>`;
        }
        html += `<button onclick="goToPage('${type}', ${current + 1})" ${current >= total ? 'disabled' : ''}>下一页</button>`;
        html += `<span class="page-info">第 ${current} / ${total} 页</span>`;
        container.innerHTML = html;
    }

    function goToPage(type, page) {
        if (type === 'weekly') {
            const total = Math.ceil(allWeeklyRecords.length / PAGE_SIZE) || 1;
            if (page < 1 || page > total) return;
            weeklyPage = page;
            renderWeeklyList();
            document.getElementById('weeklyList').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (type === 'monthly') {
            const total = Math.ceil(allMonthlyRecords.length / PAGE_SIZE) || 1;
            if (page < 1 || page > total) return;
            monthlyPage = page;
            renderMonthlyList();
            document.getElementById('monthlyList').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function toggleWeekly(id) {
        const body = document.getElementById('weeklyBody_' + id);
        const icon = document.getElementById('weeklyIcon_' + id);
        if (body.classList.contains('open')) {
            body.classList.remove('open');
            icon.classList.remove('open');
        } else {
            document.querySelectorAll('#weeklyList .record-body.open').forEach(function(el) { el.classList.remove('open'); });
            document.querySelectorAll('#weeklyList .expand-icon.open').forEach(function(el) { el.classList.remove('open'); });
            body.classList.add('open');
            icon.classList.add('open');
        }
    }

    function toggleMonthly(id) {
        const body = document.getElementById('monthlyBody_' + id);
        const icon = document.getElementById('monthlyIcon_' + id);
        if (body.classList.contains('open')) {
            body.classList.remove('open');
            icon.classList.remove('open');
        } else {
            document.querySelectorAll('#monthlyList .record-body.open').forEach(function(el) { el.classList.remove('open'); });
            document.querySelectorAll('#monthlyList .expand-icon.open').forEach(function(el) { el.classList.remove('open'); });
            body.classList.add('open');
            icon.classList.add('open');
        }
    }

    window.toggleWeekly = toggleWeekly;
    window.toggleMonthly = toggleMonthly;
    window.goToPage = goToPage;
    window.confirmDelete = confirmDelete;

    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            const tab = this.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(function(content) { content.classList.remove('active'); });
            document.getElementById(tab + 'Tab').classList.add('active');
        });
    });

    document.getElementById('editRoleBtn').addEventListener('click', function() {
        document.getElementById('roleField').style.display = 'none';
        document.getElementById('roleEditField').style.display = 'block';
        const currentRole = document.getElementById('userRoleDisplay').textContent;
        if (currentRole && currentRole !== '未设置') {
            const btns = document.querySelectorAll('#roleEditField .role-options-mini button[data-role]');
            btns.forEach(function(btn) {
                if (btn.dataset.role === currentRole) btn.classList.add('active');
            });
            const found = Array.from(btns).some(function(btn) { return btn.dataset.role === currentRole; });
            if (!found) {
                document.getElementById('customRoleInputWrapper').style.display = 'block';
                document.getElementById('customRoleInput').value = currentRole;
            }
        }
    });

    document.querySelectorAll('#roleEditField .role-options-mini button[data-role]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#roleEditField .role-options-mini button[data-role]').forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            document.getElementById('customRoleInputWrapper').style.display = 'none';
            document.getElementById('customRoleInput').value = '';
        });
    });

    document.querySelector('#roleEditField .btn-other-role').addEventListener('click', function() {
        document.querySelectorAll('#roleEditField .role-options-mini button[data-role]').forEach(function(b) { b.classList.remove('active'); });
        const wrapper = document.getElementById('customRoleInputWrapper');
        wrapper.style.display = wrapper.style.display === 'none' ? 'block' : 'none';
        if (wrapper.style.display === 'block') document.getElementById('customRoleInput').focus();
    });

    document.getElementById('saveRoleBtn').addEventListener('click', function() {
        let role = '';
        const activeBtn = document.querySelector('#roleEditField .role-options-mini button.active');
        if (activeBtn) {
            role = activeBtn.dataset.role;
        } else {
            role = document.getElementById('customRoleInput').value.trim();
        }
        if (!role) {
            alert('请选择一个岗位或输入自定义岗位名称。');
            return;
        }
        const userData = JSON.parse(localStorage.getItem('shulan_user') || '{}');
        userData.role = role;
        localStorage.setItem('shulan_user', JSON.stringify(userData));
        document.getElementById('userRoleDisplay').textContent = role;
        document.getElementById('roleField').style.display = 'flex';
        document.getElementById('roleEditField').style.display = 'none';
        document.querySelectorAll('#roleEditField .role-options-mini button[data-role]').forEach(function(b) { b.classList.remove('active'); });
        document.getElementById('customRoleInputWrapper').style.display = 'none';
        document.getElementById('customRoleInput').value = '';
    });

    document.getElementById('cancelRoleBtn').addEventListener('click', function() {
        document.getElementById('roleField').style.display = 'flex';
        document.getElementById('roleEditField').style.display = 'none';
        document.querySelectorAll('#roleEditField .role-options-mini button[data-role]').forEach(function(b) { b.classList.remove('active'); });
        document.getElementById('customRoleInputWrapper').style.display = 'none';
        document.getElementById('customRoleInput').value = '';
    });

    let deleteTarget = null;
    let deleteType = null;

    function confirmDelete(type, id) {
        deleteTarget = id;
        deleteType = type;
        document.getElementById('deleteModal').classList.add('open');
        const text = document.getElementById('deleteModalText');
        const typeLabel = type === 'weekly' ? '周报' : '月报';
        text.innerHTML = '确定要删除这条' + typeLabel + '记录吗？<br /><strong>删除后不可恢复，没有后悔药。</strong>';
    }

    document.getElementById('deleteCancelBtn').addEventListener('click', function() {
        document.getElementById('deleteModal').classList.remove('open');
        deleteTarget = null;
        deleteType = null;
    });

    document.getElementById('deleteConfirmBtn').addEventListener('click', function() {
        if (deleteType === 'weekly') {
            const index = allWeeklyRecords.findIndex(function(r) { return r.id === deleteTarget; });
            if (index !== -1) {
                allWeeklyRecords.splice(index, 1);
                if (weeklyPage > 1 && (weeklyPage - 1) * PAGE_SIZE >= allWeeklyRecords.length) weeklyPage--;
            }
            renderWeeklyList();
        } else if (deleteType === 'monthly') {
            const index = allMonthlyRecords.findIndex(function(r) { return r.id === deleteTarget; });
            if (index !== -1) {
                allMonthlyRecords.splice(index, 1);
                if (monthlyPage > 1 && (monthlyPage - 1) * PAGE_SIZE >= allMonthlyRecords.length) monthlyPage--;
            }
            renderMonthlyList();
        }
        document.getElementById('deleteModal').classList.remove('open');
        deleteTarget = null;
        deleteType = null;
    });

    document.getElementById('logoutBtn').addEventListener('click', function() {
        if (confirm('确定要退出登录吗？')) {
            localStorage.removeItem('shulan_token');
            localStorage.removeItem('shulan_user');
            checkLoginStatus();
        }
    });

    if (!localStorage.getItem('shulan_token')) {
        localStorage.setItem('shulan_token', 'mock_token_12345');
        localStorage.setItem('shulan_user', JSON.stringify({ email: 'user@example.com', role: '产品经理' }));
    }
    checkLoginStatus();
    console.log('🦥 树懒 · 个人中心 已加载');
})();
