import type { BackgroundWallpaperConfig } from "@/types/backgroundWallpaper";

export const backgroundWallpaper: BackgroundWallpaperConfig = {
	// 壁纸模式："banner" 横幅壁纸，"fullscreen" 全屏壁纸，"overlay" 覆盖透明，"none" 纯色背景无壁纸
	// fullscreen：首屏整幅展示壁纸（16:9 屏幕配 16:9 图几乎不裁切），内容区下滑覆盖——哥哥的图能完整显示
	mode: "fullscreen",
	// 是否启用背景视频播放，配置后将在导航栏显示视频播放按钮
	playerEnable: true,
	/**
	 * 背景图片配置
	 * 图片路径支持三种格式：
	 * 1. public 目录（以 "/" 开头，不优化）："/assets/images/banner.avif"
	 * 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/banner.avif"
	 * 3. 远程 URL："https://example.com/banner.jpg"
	 * 注意：远程URL和public目录的图片不会被优化，请确保图片体积足够小以免影响加载速度
	 *
	 * 建议不要替换d1-d6，m1-m6这些默认示例图片，但你可以删除掉节省空间
	 * 因为以后可能会更换示例图片，导致你自定义的图片被覆盖
	 * 所以建议使用自己的图片的时候命名为其他名称，不要使用d1-d6，m1-m6这些名称
	 *
	 * 如果只使用一张图片或者使用随机图API，推荐直接使用字符串格式：
	 * desktop: "https://t.alcy.cc/pc",   // 随机图API
	 * desktop: "assets/images/DesktopWallpaper/d1.avif", // 单张图片
	 *
	 * mobile: "https://t.alcy.cc/mp", // 随机图API
	 * mobile: "assets/images/MobileWallpaper/m1.avif", // 单张图片
	 *
	 * 支持配置多张图片（数组），每次刷新页面随机显示一张：
	 * desktop: [
	 * "assets/images/DesktopWallpaper/d1.avif",
	 * "assets/images/DesktopWallpaper/d2.avif",
	 * ],
	 *
	 * mobile:[
	 *   "assets/images/MobileWallpaper/m1.avif",
	 *   "assets/images/MobileWallpaper/m2.avif",
	 * ],
	 */
	src: {
		// 桌面背景图片（横版 EVA 画集，8 张轮播）2026-08-29
		desktop: [
			"https://img.akakahome.cc.cd/file/1787977490826_eva_94219701.webp",
			"https://img.akakahome.cc.cd/file/1787977500001_eva_47402905.webp",
			"https://img.akakahome.cc.cd/file/1787977498016_eva_80472549.webp",
			"https://img.akakahome.cc.cd/file/1787977502140_eva_98473741.webp",
			"https://img.akakahome.cc.cd/file/1787977511060_eva_94239910.webp",
			"https://img.akakahome.cc.cd/file/1787977515074_eva_97560811.webp",
			"https://img.akakahome.cc.cd/file/1787977514643_eva_128306602.webp",
			"https://img.akakahome.cc.cd/file/1787977514675_eva_142698411.webp",
		],
		// 移动背景图片（竖版 EVA 画集，16 张轮播）
		mobile: [
			"https://img.akakahome.cc.cd/file/1787977522517_eva_89174443.webp",
			"https://img.akakahome.cc.cd/file/1787977526748_eva_81089817.webp",
			"https://img.akakahome.cc.cd/file/1787977531630_eva_87390668.webp",
			"https://img.akakahome.cc.cd/file/1787977537256_eva_88814719.webp",
			"https://img.akakahome.cc.cd/file/1787977535305_eva_91517993.webp",
			"https://img.akakahome.cc.cd/file/1787977546694_eva_88853525.webp",
			"https://img.akakahome.cc.cd/file/1787977546250_eva_67438350.webp",
			"https://img.akakahome.cc.cd/file/1787977546608_eva_133371256.webp",
			"https://img.akakahome.cc.cd/file/1787977555863_eva_125331064.webp",
			"https://img.akakahome.cc.cd/file/1787977554028_eva_129264046.webp",
			"https://img.akakahome.cc.cd/file/1787977562558_eva_97353822.webp",
			"https://img.akakahome.cc.cd/file/1787977566312_eva_133258822.webp",
			"https://img.akakahome.cc.cd/file/1787977564419_eva_86659485.webp",
			"https://img.akakahome.cc.cd/file/1787977564324_eva_61340667.webp",
			"https://img.akakahome.cc.cd/file/1787977573296_eva_97597871.webp",
			"https://img.akakahome.cc.cd/file/1787977571886_eva_134502725.webp",
		],
		// 背景视频播放地址
		// 支持单个视频路径（字符串）、多个视频循环（数组）或横竖分设（对象 desktop/mobile）
		// 支持远程视频URL，本地视频请放在 public/assets/videos/ 目录下
		// playerUrl: "/assets/videos/firefly.mp4",
		// 哥哥的 Wallpaper Engine 视频（横屏=桌面，竖屏=手机）2026-08-29
		playerUrl: {
			desktop: "https://img.akakahome.cc.cd/file/1787976180042_ask_v2_web.mp4",
			mobile: "https://img.akakahome.cc.cd/file/1787976218043_eva_mobile_web.mp4",
		},
	},
	// 横幅壁纸和全屏壁纸共享配置
	common: {
		// 壁纸遮罩暗度，让横幅文字显示更清晰，0-1之间，值越大越暗
		dimOpacity: 0.2,
		// 多视频播放模式："order" 顺序循环，"random" 随机切换（仅当 playerUrl 为数组时生效）
		playerMode: "random",
		// 主页横幅文字
		homeText: {
			// 是否启用主页横幅文字
			enable: true,
			// 主页横幅主标题
			title: "阿咔咔的小窝",
			// 主页横幅主标题字体大小
			titleSize: "4.5rem",
			// 主页横幅副标题
			subtitle: [
				"残酷な天使のように",
				"少年よ、神話になれ",
				"记录生活，分享热爱",
				"さようなら、すべてのエヴァンゲリオン",
			],
			// 主页横幅副标题字体大小
			subtitleSize: "1.5rem",
			typewriter: {
				// 是否启用打字机效果
				// 打字机开启 → 循环显示所有副标题
				// 打字机关闭 → 每次刷新随机显示一条副标题
				enable: true,
				// 打字速度（毫秒）
				speed: 100,
				// 删除速度（毫秒）
				deleteSpeed: 50,
				// 完全显示后的暂停时间（毫秒）
				pauseTime: 2000,
			},
			// 是否显示标题下方的链接图标
			linksEnable: true,
			// 首页横幅标题下方的链接图标（可选，支持 showName 显示文字）
			// 图标支持 Iconify 格式：fa7-brands:github、fa7-solid:envelope、mdi:rss 等
			links: [
				{
					name: "GitHub",
					icon: "fa7-brands:github",
					url: "https://github.com/jaxketpodra",
					showName: true,
				},
				{
					name: "图床",
					icon: "material-symbols:image-outline",
					url: "https://img.akakahome.cc.cd",
					showName: true,
				},
				{
					name: "RSS",
					icon: "fa7-solid:rss",
					url: "/rss/",
				},
			],
		},
		// 壁纸轮播配置，横幅壁纸和全屏壁纸共享，仅在配置多张图片时生效
		carousel: {
			// 是否启用壁纸轮播；关闭时保持每次刷新随机显示一张
			enable: true,
			// 轮播切换间隔（毫秒）
			interval: 8000,
			// 过渡效果: 'fade' 渐变 | 'zoom' 缩放 | 'slide' 滑动 | 'kenburns' 旋转木马
			transitionEffect: "fade",
		},
	},
	// Banner模式特有配置
	banner: {
		// 图片位置
		// 支持所有CSS object-position值，如: 'top', 'center', 'bottom', 'left top', 'right bottom', '25% 75%', '10px 20px'..
		// 如果不知道怎么配置百分百之类的配置，推荐直接使用：'center'居中，'top'顶部居中，'bottom' 底部居中，'left'左侧居中，'right'右侧居中
		position: "0% 20%",
		// 文章横幅信息："description" 显示描述，"meta" 显示日期、字数和阅读时长
		postInfo: {
			mode: "description",
		},
		// 导航栏配置
		navbar: {
			// 导航栏透明模式："semi" 半透明，"full" 完全透明，"semifull" 动态透明
			transparentMode: "semi",
			// 毛玻璃模糊度，0 即关闭导航栏的毛玻璃
			// 注意：导航栏子菜单与浮动面板始终保留毛玻璃，模糊度跟随此项但有最小值
			blur: 5,
		},
		// 水波纹动画效果配置，开启会影响页面性能，增加内存占用，请根据自己的喜好开启
		waves: {
			enable: {
				// 桌面端是否启用水波纹动画效果
				desktop: true,
				// 移动端是否启用水波纹动画效果
				mobile: true,
			},
		},
		// 渐变过渡效果配置，当水波纹关闭时自动启用，提供壁纸底部到背景色的平滑过渡
		gradient: {
			enable: {
				// 桌面端是否启用渐变过渡
				desktop: true,
				// 移动端是否启用渐变过渡
				mobile: true,
			},
			// 渐变高度
			height: "10%",
		},
	},
	// 覆盖透明覆盖模式特有配置
	overlay: {
		// 层级，确保壁纸在背景层
		zIndex: -1,
		// 壁纸透明度
		opacity: 0.8,
		// 背景模糊度
		blur: 10,
		// 卡片透明度，0-1之间，值越小越透明
		cardOpacity: 0.6,
	},
	// 全屏壁纸模式特有配置
	// 全屏模式下壁纸固定全屏显示，首屏居中标题，内容区在首屏之下、下滑时覆盖壁纸
	// 壁纸模糊度(blur)、卡片透明度(cardOpacity)、层级(zIndex) 复用上方 overlay 模式的配置；
	// 背景透明度(opacity)不适用（全屏壁纸不透明）；导航栏透明模式由卡片透明度控制，脱离 banner 的 navbar 配置
	fullscreen: {
		// 图片位置
		position: "center",
		// 全屏壁纸模式的导航栏配置
		navbar: {
			// 是否开启动态透明：开启后首页顶部导航栏透明，下滑后变不透明（仅首页生效）
			dynamicTransparent: true,
		},
		// 首页下滑时壁纸模糊渐变开关（从 0 渐变为 overlay.blur 的最大模糊）
		// 关闭后该设备上全屏壁纸保持清晰（首页与非首页都不模糊），设置面板的模糊度滑块也会隐藏
		blurRamp: {
			enable: {
				// 桌面端是否启用模糊渐变
				desktop: true,
				// 移动端是否启用模糊渐变
				mobile: true,
			},
		},
	},
};
