/**
 * 相机界面控制模块
 * 负责处理相机界面的交互和显示
 */

// 当页面加载完成时初始化相机界面
document.addEventListener('DOMContentLoaded', () => {
    // 获取相机相关元素
    const cameraButton = document.getElementById('camera-button');
    const cameraInterface = document.getElementById('camera-interface');
    const closeCamera = document.getElementById('close-camera');
    const takePhoto = document.getElementById('take-photo');
    const retakePhoto = document.getElementById('retake-photo');
    const usePhoto = document.getElementById('use-photo');
    const switchCameraBtn = document.getElementById('switch-camera');
    
    // 初始化相机界面事件
    initCameraUIEvents(cameraButton, cameraInterface, closeCamera, takePhoto, retakePhoto, usePhoto, switchCameraBtn);
    
    // 监听照片拍摄事件
    document.addEventListener('photoTaken', handlePhotoTaken);
});

/**
 * 初始化相机界面事件
 * @param {HTMLElement} cameraButton - 相机按钮
 * @param {HTMLElement} cameraInterface - 相机界面容器
 * @param {HTMLElement} closeCamera - 关闭相机按钮
 * @param {HTMLElement} takePhoto - 拍照按钮
 * @param {HTMLElement} retakePhoto - 重拍按钮
 * @param {HTMLElement} usePhoto - 使用照片按钮
 * @param {HTMLElement} switchCameraBtn - 切换相机按钮
 */
function initCameraUIEvents(cameraButton, cameraInterface, closeCamera, takePhoto, retakePhoto, usePhoto, switchCameraBtn) {
    // 点击打开相机
    if (cameraButton) {
        cameraButton.addEventListener('click', () => {
            if (cameraInterface) {
                showCameraInterface(cameraInterface);
            }
        });
    }
    
    // 点击关闭相机
    if (closeCamera) {
        closeCamera.addEventListener('click', () => {
            if (cameraInterface) {
                hideCameraInterface(cameraInterface);
            }
        });
    }
    
    // 点击拍照
    if (takePhoto) {
        takePhoto.addEventListener('click', () => {
            if (window.camera && typeof window.camera.capturePhoto === 'function') {
                window.camera.capturePhoto();
            }
        });
    }
    
    // 点击重拍
    if (retakePhoto) {
        retakePhoto.addEventListener('click', resetCameraView);
    }
    
    // 点击使用照片
    if (usePhoto) {
        usePhoto.addEventListener('click', () => {
            if (cameraInterface) {
                hideCameraInterface(cameraInterface);
            }
        });
    }
    
    // 切换前后摄像头
    if (switchCameraBtn) {
        switchCameraBtn.addEventListener('click', () => {
            if (window.camera && typeof window.camera.switchCamera === 'function') {
                window.camera.switchCamera();
            }
        });
    }
    
    // 处理屏幕方向变化
    window.addEventListener('orientationchange', handleOrientationChange);
}

/**
 * 显示相机界面
 * @param {HTMLElement} cameraInterface - 相机界面容器
 */
function showCameraInterface(cameraInterface) {
    cameraInterface.classList.remove('hidden');
    
    // 启动相机
    if (window.camera && typeof window.camera.openCamera === 'function') {
        window.camera.openCamera();
    }
    
    // 确保相机控制处于正确状态
    resetCameraView();
    
    // 防止页面滚动
    document.body.style.overflow = 'hidden';
}

/**
 * 隐藏相机界面
 * @param {HTMLElement} cameraInterface - 相机界面容器
 */
function hideCameraInterface(cameraInterface) {
    cameraInterface.classList.add('hidden');
    
    // 关闭相机
    if (window.camera && typeof window.camera.closeCamera === 'function') {
        window.camera.closeCamera();
    }
    
    // 恢复页面滚动
    document.body.style.overflow = 'auto';
}

/**
 * 重置相机视图
 */
function resetCameraView() {
    const photoPreview = document.getElementById('photo-preview');
    const videoElement = document.getElementById('camera-preview');
    const cameraControls = document.getElementById('camera-controls');
    const photoControls = document.getElementById('photo-controls');
    
    if (photoPreview) photoPreview.classList.add('hidden');
    if (videoElement) videoElement.classList.remove('hidden');
    if (cameraControls) cameraControls.classList.remove('hidden');
    if (photoControls) photoControls.classList.add('hidden');
}

/**
 * 处理照片拍摄事件
 */
function handlePhotoTaken() {
    const cameraControls = document.getElementById('camera-controls');
    const photoControls = document.getElementById('photo-controls');
    
    if (cameraControls) cameraControls.classList.add('hidden');
    if (photoControls) photoControls.classList.remove('hidden');
}

/**
 * 处理屏幕方向变化
 */
function handleOrientationChange() {
    // 重新调整相机视图
    const videoElement = document.getElementById('camera-preview');
    
    if (videoElement && videoElement.srcObject) {
        // 短暂延迟以确保UI已更新
        setTimeout(() => {
            videoElement.style.height = '100%';
            videoElement.style.width = '100%';
        }, 300);
    }
}

// 导出相机界面功能
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showCameraInterface,
        hideCameraInterface,
        resetCameraView,
        handlePhotoTaken
    };
} else {
    // 添加到全局对象
    window.cameraUI = {
        showCameraInterface,
        hideCameraInterface,
        resetCameraView,
        handlePhotoTaken
    };
} 