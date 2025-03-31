/**
 * 相机功能模块
 * 负责照片拍摄和相机控制
 */

// 媒体流
let mediaStream = null;
// 默认摄像头朝向
let facingMode = 'environment'; // 'environment'为后置摄像头，'user'为前置摄像头

// 当页面加载完成时初始化相机
document.addEventListener('DOMContentLoaded', () => {
    // 检查摄像头状态
    checkCamera();
    
    // 相机事件初始化由cameraUI.js处理
});

/**
 * 打开相机
 */
function openCamera() {
    const videoElement = document.getElementById('camera-preview');
    
    if (!videoElement) return;
    
    // 关闭已有的媒体流
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
    }
    
    // 获取摄像头权限
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 }
        },
        audio: false
    })
    .then(stream => {
        mediaStream = stream;
        videoElement.srcObject = stream;
        videoElement.play();
        
        // 显示相机预览
        videoElement.classList.remove('hidden');
        
        // 更新相机状态
        const cameraButton = document.getElementById('camera-button');
        if (cameraButton) {
            cameraButton.disabled = false;
        }
    })
    .catch(error => {
        console.error('获取相机权限失败:', error);
        
        // 更新相机状态
        const cameraButton = document.getElementById('camera-button');
        if (cameraButton) {
            cameraButton.disabled = true;
        }
        
        // 显示错误提示
        if (typeof showToast === 'function') {
            showToast('无法访问相机，请检查权限设置', 'error');
        } else if (window.utils && typeof window.utils.showToast === 'function') {
            window.utils.showToast('无法访问相机，请检查权限设置', 'error');
        } else {
            alert('无法访问相机，请检查权限设置');
        }
    });
}

/**
 * 拍照
 */
function capturePhoto() {
    const videoElement = document.getElementById('camera-preview');
    const photoPreview = document.getElementById('photo-preview');
    
    if (!videoElement || !photoPreview) return;
    
    // 创建canvas并截取当前视频帧
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // 设置canvas尺寸与视频一致
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    
    // 绘制当前视频帧
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
    // 转换为图片URL
    const imageUrl = canvas.toDataURL('image/jpeg');
    
    // 设置预览图片
    photoPreview.src = imageUrl;
    photoPreview.classList.remove('hidden');
    
    // 隐藏视频预览
    videoElement.classList.add('hidden');
    
    // 通知UI界面照片已拍摄
    document.dispatchEvent(new CustomEvent('photoTaken'));
    
    // 将图片转换为Blob并创建File对象
    canvas.toBlob(blob => {
        const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
        
        // 触发照片捕获事件
        const event = new CustomEvent('photoCaptured', {
            detail: { file: file, dataUrl: imageUrl }
        });
        document.dispatchEvent(event);
    }, 'image/jpeg', 0.95); // 95%质量的JPEG
}

/**
 * 关闭相机
 */
function closeCamera() {
    // 停止媒体流
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
    }
}

/**
 * 切换前后摄像头
 */
function switchCamera() {
    // 切换facingMode
    facingMode = facingMode === 'user' ? 'environment' : 'user';
    
    // 重新打开相机
    openCamera();
}

/**
 * 检查摄像头设备
 */
function checkCamera() {
    // 检查浏览器是否支持getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('浏览器不支持摄像头访问');
        
        // 禁用相机按钮
        const cameraButton = document.getElementById('camera-button');
        if (cameraButton) {
            cameraButton.disabled = true;
        }
        return;
    }
    
    // 检查可用的摄像头设备
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            const hasCameras = videoDevices.length > 0;
            
            // 根据摄像头状态更新按钮
            const cameraButton = document.getElementById('camera-button');
            if (cameraButton) {
                cameraButton.disabled = !hasCameras;
            }
            
            // 根据摄像头数量更新切换摄像头按钮
            const switchCameraBtn = document.getElementById('switch-camera');
            if (switchCameraBtn && videoDevices.length < 2) {
                switchCameraBtn.classList.add('hidden');
            }
        })
        .catch(error => {
            console.error('检查摄像头设备失败:', error);
        });
}

// 导出相机功能
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openCamera,
        capturePhoto,
        closeCamera,
        switchCamera,
        checkCamera
    };
} else {
    // 添加到全局对象
    window.camera = {
        openCamera,
        capturePhoto,
        closeCamera,
        switchCamera,
        checkCamera
    };
} 