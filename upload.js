// 绑定事件
function bindEvents() {
    if (!fileUpload || !uploadZone || !nextButton) {
        console.error('无法绑定事件：关键DOM元素未找到');
        return;
    }

    console.log('绑定拖放和文件上传事件');

    // 拖拽上传相关事件
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // 高亮拖拽区域
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, unhighlight, false);
    });

    // 处理文件拖拽
    uploadZone.addEventListener('drop', handleDrop, false);

    // 检查上传区域是否已经绑定点击事件 - 修复重复触发问题
    // 移除对uploadZone的点击事件监听，因为HTML中已使用label绑定
    // 修改前的代码: uploadZone.addEventListener('click', function () { fileUpload.click(); });

    // 文件选择事件
    fileUpload.addEventListener('change', function () {
        console.log('选择了文件:', this.files.length, '个文件');
        handleFiles(this.files);
    });

    // 下一步按钮点击事件
    nextButton.addEventListener('click', function () {
        // ... existing code ...
    });
} 