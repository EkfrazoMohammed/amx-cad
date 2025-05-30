import * as THREE from "three";
import { ImageDrawable } from "./ImageDrawable";
import { OverviewMapDrawable } from "./OverviewMapDrawable";
import type { Drawable } from "../../core/canvas/Drawable";
import { Plugin, PluginConfig } from "../../core/viewers/Plugin";
import { ViewerEvent } from "../../core/viewers/ViewerEvent";
export interface OverviewMapPluginConfig extends Partial<PluginConfig> {
    containerId?: string;
    context?: WebGLRenderingContext | WebGL2RenderingContext;
    enabled?: boolean;
    lockCameraInViewCenter?: boolean;
    radius?: number;
    minZoomFactor?: number;
    maxZoomFactor?: number;
    size?: {
        width: number;
        height: number;
    };
}
export interface UpdateOverviewMapConfig {
    image: string;
    min: THREE.Vector3;
    max: THREE.Vector3;
}
export declare enum OverviewMapPluginEvent {
    ZoomChange = "zoomchange",
    SyncCamera = "synccamera",
    CameraChange = "camerachanged"
}
export declare class OverviewMapPlugin extends Plugin<Record<OverviewMapPluginEvent | ViewerEvent, any>> {
    static readonly DEFAULT_ID = "OverviewMapPlugin";
    private cfg;
    private viewerContainer?;
    private readonly CAMERA_Z_POSITION;
    private width;
    private height;
    private frustumSize;
    private renderEnabled;
    private drawableList;
    private clock;
    private requestAnimationFrameHandle?;
    private camera?;
    private scene?;
    private renderer?;
    private overlayRender?;
    private raf?;
    private timeoutSymbol?;
    private raycaster?;
    private inputManager?;
    private controls?;
    private groundPlane?;
    private minZoomFactor;
    private maxZoomFactor;
    private radius?;
    private size?;
    private initialZoom?;
    private cameraZoom?;
    private imgBBox?;
    private translateStart;
    private rotateStart;
    private markerRotateState;
    private markerTranslateState;
    private isMarkerRotating;
    private isMarkerTranslating;
    private isUpdateWhenPawnMove;
    private timeout?;
    private animationId?;
    private animationParam?;
    private boundaries?;
    private allMarkersBBox;
    tolerance: number;
    enabled: boolean;
    lockCameraInViewCenter: boolean;
    enableLookToAllMarkers: boolean;
    constructor(viewer: any, cfg?: OverviewMapPluginConfig);
    get cameraDrawable(): ImageDrawable;
    get cameraDirDrawable(): ImageDrawable;
    get overviewMapDrawable(): OverviewMapDrawable;
    private init;
    private initDom;
    private initInputManager;
    private initScene;
    private initCamera;
    private initRenderer;
    private initControls;
    private onControlsChange;
    private onControlsUpdate;
    private initEvents;
    /******* Overview map events ********/
    private getDrawableByEvent;
    private onCameraHover;
    private handlePointerDown;
    private onCameraMove;
    private handlePointerUp;
    private handlePointerLeave;
    private handlePointerEnter;
    private handleDblClick;
    private handlePointerMove;
    private syncCamera;
    /*****************************************************/
    /******* According radius to calculate zoom ********/
    private updateZoomFromRadius;
    private getContainerRadius;
    private screenDistance2WorldDistance;
    /*****************************************************/
    /******* create ground plane for pick ********/
    protected initGroundPlane(bbox: THREE.Box3): void;
    /*****************************************************/
    private initMaxAndMinZoom;
    /************** create overviewMap ****************/
    getImageElementFromUrl(url: string): Promise<HTMLImageElement>;
    updateOverviewMap(cfg: UpdateOverviewMapConfig): Promise<void>;
    private createCameraMarkers;
    initCameraMarkers(position: THREE.Vector3, direction: THREE.Vector3): Promise<void>;
    /*****************************************************/
    /************** Upate overview map camera ****************/
    private updateOverviewMapCameraAnimation;
    updateOverviewMapCamera(position: THREE.Vector3, direction: THREE.Vector3): void;
    /*****************************************************/
    private zoomToBBox;
    private enableRender;
    addMarker(marker: Drawable): void;
    getMarker(id: string): Drawable | undefined;
    removeMarker(marker: Drawable): void;
    dollyIn(zoomDelta?: number): void;
    dollyOut(zoomDelta?: number): void;
    goToHomeView(): void;
    setRadius(radius: number): void;
    registerBoundaries(boundries: {
        id: string;
        name: string;
        points: THREE.Vector2[];
    }[]): void;
    isPointInBoundary: (position: THREE.Vector2) => undefined;
    screenShot(): Promise<string | undefined>;
    /**
     * @internal
     */
    getViewerConfig(): OverviewMapPluginConfig;
    is3d(): boolean;
    getRaycaster(): THREE.Raycaster | undefined;
    /**
     * Gets how long a pixel represents in world coordinate.
     * This works fine for OrthographicCamera.
     * As for PerspectiveCamera, a pixel represents different size for different position,
     * depends on how far the camera is and its fov, etc. We'll simply take the camera target as the position to calculate.
     * @internal
     */
    getPixelSizeInWorldCoord(): number;
    private lookToAllMarkers;
    private resize;
    private animate;
    destroy(): void;
}
