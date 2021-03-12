interface PlayerPosition extends Array<number> {

}
interface LocalPlayer {
  /**Returns if the player can see the entity based on the entity ID */
  canSeeEntity(entityId: number): boolean
  /** Returns the player's moveForward and moveStrafing as an array ([0] and [1] to access it)*/
  getMoveInput()
  /**Returns the player's ingame name*/
  getName(): string
  /**Returns the player's entity ID */
  getId(): number
  /**Returns the player's position
   *x = localPlayer.getPosition()[0]
   *y = localPlayer.getPosition()[1]
   *z = localPlayer.getPosition()[2]
   */
  getPosition(): PlayerPosition[]
  /**Sets the player's position
   * @param x the player's x coordinate
   * @param y the player's y coordinate
   * @param z the player's z coordinate
   */
  setPosition(x: number, y: number, z: number): void
  /**Returns the distance between the local player and the entity with id
   * @param id the entity id
   */
  getDistanceToEntity(id: number): number
  /**Returns the player's angles in an array
   * yaw = localPlayer.getAngles()[0]
   * pitch = localPlayer.getAngles()[1]
   */
  getAngles(): any
  /**Sets the player's looking angles.
   * @param yaw the player's yaw
   * @param pitch the player's pitch
   */
  setAngles(yaw: number, pitch: number): void
  /**Returns the player's motion along x, y, and z in an array*/
  getMotion(): any
  /**Sets the player's motion along x, y and z
   * @param x x motion
   * @param y y motion
   * @param z z motion
   */
  setMotion(x: number, y: number, z: number): void
  /**Sets the player's speed
   * @param speed player's movement speed
  */
  setSpeed(speed: number): void
  /**Returns whether the player is on the ground or not in a boolean */
  isOnGround(): boolean
  /**Returns whether the player is on a ladder or not */
  isOnLadder(): boolean
  /**Makes the player jump */
  jump(): void
  /**Sends a message to chat */
  sendMessage(message: string): void
  /**Returns the player's hurt ticks. 
   * Possible return values are between 10 and 0
   * The value is 10 on a damage tick and counts to 0 every tick afterwards
  */
  getHurtTime(): number
  /**Return's the entity ID of the current killaura target. Remember to refresh entities when using this function
   * If killaura is not targetting anyone, the entity id will be -1
   */
  getKillAuraTarget(): number
  /**Return's the player's active hotbar slot */
  getHotBarSlot(): number
  /**Sets the player's active hotbar slot
   * @param slot the slot to set to.
   */
  setHotBarSlot(slot: number): void
  /**Returns whether or not the player is using their held item */
  isUsingItem(): void
  /**Sends a packet to the server
   * @param packedId sendable packets are playerPacket: 9, packetEntityAction: 1, packetSwing: 0
   * @param data the data to be sent in the packet
   
  playerPacket Id: 9 Data:
          - onGround
          - yaw
          - pitch
          - x
          - y
          - z

  Possible data combinations:
          - onGround
          - x, y, z, onGround
          - yaw, pitch, onGround
          - x, y, z, yaw, pitch, onGround

  packetEntityAction:
       Id: 1
       Data:
          - action:
          - START_SNEAKING (0)
          - STOP_SNEAKING (1)
          - START_SPRINTING (3)
          - STOP_SPRINTING (4)
          - RIDING_JUMP (5)
          - OPEN_INVENTORY (6)

  packetSwing:
      Id: 0
   */
  sendPacket(packetId: number, data?: PlayerPacket): void
  /**
   * Returns how long a player has existed in the world.
   */
  getTicksExisted(): number
}
interface BoundingBox extends Array<Number> {
  [index: number]: number
}
interface Entity {
  /**Refreshes and loads all entities */
  getEntities(): any[]
  /**Returns the entity's health 
   * @param id the entity's id
  */
  getHealth(id: number): number
  /**Returns the entity's hurt ticks 
   * @param id the entity's id
   */
  getHurtTime(id: number): number
  /**Returns the bounding box of an entity in an array
   * @param id the entity's id
  
  return values:
      - minX: 0
      - minY: 1
      - minZ: 2
      - maxX: 3
      - maxY: 4
      - maxZ: 5
    @returns boundingBox
   */
  getBoundingBox(id: number): BoundingBox;
  /**Returns the position of an entity in an array
   * @param id the entity's id
    
  return values:
      - x
      - y
      - z
   */
  getPosition(id: number): any
  /**Returns the name of the entity
   * @param id the entity's id
   */
  /**Returns the entity's angles
   * @param id entity id
   */
  getAngles(id: number): any
  getName(id: number)
  /**Returns the display name of the entity
   * @param id the entity's id
   */
  getDisplayName(id: number): string
  /**Returns a boolean based on if the entity is a player or not
   * @param id the entity's id
   */
  isPlayer(id: number): boolean
  /**Returns the name of the entity's held item
   * @param id
   */
  getHeldItemName(id: number): string
}
interface World {
  /** Returns the block name at the coordinates specified
   * @param x x coordinate
   * @param y y coordinate
   * @param z z coordinate
  */
  getBlock(x: number, y: number, z: number): string
  /**Returns the current world timer*/
  getTimer(): number
  /**Multiplies the world's tickrate by a given amount
   * @param amount how much the world's tickrate will be multiplied by
   */
  setTimer(amount: number): void
}
interface ModuleManager {
  /**Registers a module and adds it to the gui
   * @param mod the instance of the module
   */
  registerModule(mod: any): void
  /**Unregisters a module and removes it from the gui
   * @param mod the instance of the module
   */
  unregisterModule(mod: any): void
  /**Registers a boolean option and attaches it to the specified module
   * @param moduleName the name of the module
   * @param optionName the name of the option
   * @param description what the option does/changes
   * @param defaultValue true/false
   */
  registerBoolean(moduleName: string, optionName: string, description: string, defaultValue: boolean): void
  /**Returns if the specified option is true or false
   * @param optionName only works for options registered by scripts
   */
  getBoolean(optionName: string): boolean
  /**Returns if the module is visible*/
  isVisible(): boolean
  /**Returns if the specified module is active in a boolean
   * @param moduleName name of the module
   */
  isModuleActive(moduleName: string): boolean
}
interface Notification {
  /**A notification if something is done successfully
   * @param title name of the notification
   * @param body main body of the notification
   * @param duration how many milliseconds the notification will exist for
   */
  success(title: string, body: string, duration: number): void
  /**A notification to display general info
   * @param title name of the notification
   * @param body main body of the notification
   * @param duration how many milliseconds the notification will exist for
   */
  info(title: string, body: string, duration: number): void
  /**A notification if something goes wrong
   * @param title name of the notification
   * @param body main body of the notification
   * @param duration how many milliseconds the notification will exist for
   */
  warn(title: string, body: string, duration: number): void
}
interface Render {
  /**Draws a rectangle on the screen
   * @param x starting x coordinate
   * @param y starting y coordinate
   * @param x1 ending x coordinate
   * @param y1 ending y coordinate
   * @param r red value 0 - 255
   * @param g green value 0 - 255
   * @param b blue value 0 - 255
   * @param alpha the opacity 0 - 255
   */
  drawRect(x: number, y: number, x1: number, y1: number, r: number, g: number, b: number, alpha: number): void
  /**Writes some words on the screen
   * @param text What does it say?
   * @param x the x position of the text
   * @param y the y position of the text
   * @param hexColor the color of the text
   */
  drawString(text: string, x: number, y: number, hexColor: string): void
  /**Returns the width of the inputed string
   * @param text the string to check the width of
   */
  getStringWidth(text: string): number
}

declare class AstolfoModule {
  /**the name of the module. This is what will appear in your gui and array list */
  getName?(): string;
  /**
 * Called when the script or module is enabled
 */
  onEnable?(): void
  /**
   * Called when the script or module is disabled
   */
  onDisable?(): void
  /**
   * Called when the player moves
   * @param x x amount
   * @param y y amount
   * @param z z amount
   */
  onPlayerMove?(x: number, y: number, z: number): void
  /**
   * Called when the world is loaded
   */
  onPlayerCreate?(): void
  /**
   * Called at the beginning of the localPlayer update method
   */
  onPreUpdate?(): void
  /**
   * Called at the end of the localPlayer update method
   */
  onPostUpdate?(): void
  /**
   * Called at the beginning of the localPlayer update method. User this event if you want to change what variables are networked to the server
   * @param x x coordinate
   * @param y y coordinate
   * @param z z coordinate
   * @param yaw player's yaw
   * @param pitch player's pitch
   * @param onGround the player's onground state
   */
  onPreMotion?(x: number, y: number, z: number, yaw: number, pitch: number, onGround: boolean): PlayerPacket
  /**Called when a packet is sent to the server. Not all packets will contain data.
   * Return false to allow packets; return true to cancel packets
  
    packetChatMessage:
  
    packetId: 7
  
    data: message
  
    packetUseEntity:
  
    packetId: 8
  
    for more packet details please refer to localPlayer.sendPacket()
   
   * @param packetId packet id
   * @param data packet content
   */
  onSendPacket?(packetId: number, data: PlayerPacket): void
  /**Called when the in-game overlay is rendering
   * Use this event to render things
   * @param width the width of the gui
   * @param height the height of the gui
   * @param partialTicks ticks between rendering
   */
  onRender2D?(width: number, height: number, partialTicks: number): void
  /**
   * Called when the world is rendering
   */
  onRender3D?(partialTicks: number)
}

declare class PlayerPacket {
  [index: number]: number | boolean
}
interface Chat {
  /**
   * Sends a message to chat
   * @param message message to be sent to chat
   */
  send(message: string)
}

declare var notification: Notification;
declare var chat: Chat;
declare var render: Render;
declare var moduleManager: ModuleManager;
declare var world: World;
declare var entity: Entity;
declare var localPlayer: LocalPlayer;
declare var org: Org;
declare var system: System;
interface Org {
  lwjgl: Lwjgl;
}
interface Lwjgl {
  input: Input;
  opengl: OpenGL;
}
interface Input {
  Keyboard: _Keyboard;
  Mouse: _Mouse;
  Cursor: _Cursor;
}
interface _Keyboard {
  /**Checks to see if a key is down */
  isKeyDown(key: number): boolean
  /**Check whether repeat events are currently reported or not*/
  areRepeatEventsEnabled(): boolean
  /**"Create" the keyboard */
  create(): void
  /**"Destroy" the keyboard */
  destroy(): void
  /**Controls whether repeat events are reported or not */
  enabledRepeatEvents(enable: boolean): void
  /**Please note that the key code returned is NOT valid against the current keyboard layout */
  getEventKey(): number
  /**Gets the state of the key that generated the current event */
  getEventKeyState(): boolean
  /**Gets the time in nanoseconds of the current event. */
  getEventNanoseconds(): bigint
  getKeyCount(): number
  /**Get's a key's index 
   * @param key example, 'space' would return the number 57
  */
  getKeyIndex(key: string): number
  /**Get's a key's name 
   * @param key example, 57 would return 'space'
  */
  getKeyName(key: number): string
  /**Gets the number of keyboard events waiting after doing a buffer enabled poll(). */
  getNumKeyboardEvents(): number
  isCreated(): boolean
  isRepeatEvent(): boolean
  /**Gets the next keyboard event */
  next(): boolean
  /**Polls the keyboard for its current state */
  poll(): void
}
interface _Mouse {
  /**See if a particular mouse button is down */
  isButtonDown(button: number): boolean
  /**Retrieves the absolute position */
  getX(): number
  /**Retries the absolute position */
  getY(): number
  /**"Create" the mouse */
  create(): void
  /**"Destroy" the mouse */
  destroy(): void
  getButtonCount(): number
  /**Get's a button's index */
  getButtonIndex(buttonName: string): number
  /**Get's a button's name*/
  getButtonName(button: number): string
  getDWheel(): number
  getDX(): number
  getDY(): number
  getEventButton(): number
  /**Get the current events button state */
  getEventButtonState(): boolean
  getEventDWheel(): number
  getEventDX(): number
  getEventDY(): number
  /**Gets the time in nanoseconds of the current event. */
  getEventNanoseconds(): bigint
  getEventX(): number
  getEventY(): number
  /**Gets the currently bound native cursor, if any */
  getNativeCursor(): _Cursor
  hasWheel(): boolean
  isClipMouseCoordinatesToWindow(): boolean
  isCreated(): boolean
  isGrabbed(): boolean
  /**Retrieves whether or not the mouse cursor is within the bounds of the window */
  isInsideWindow(): boolean
  /**Gets the next mouse event */
  next(): boolean
  /**Polls the mouse for its current state */
  poll(): void
  setClipMouseCoordinatesToWindow(clip: boolean): void
  /**Set the position of the cursor */
  setCursorPosition(x: number, y: number): void
  /**Sets whether or not the mouse has grabbed the cursor */
  setGrabbed(grab: boolean): void
  /**Binds a native cursor */
  setNativeCursor(cursor: _Cursor): _Cursor
  /**Updates the cursor, so that animation can be changed if needed */
  updateCursor(): void

}
interface _Cursor {
  /**Destroy the native cursor */
  destroy(): void
  /**Get the capabilities of the native cursor */
  getCapabilities(): number
  /**Gets the maximum size of a native cursor */
  getMaxCursorSize(): number
  /**Gets the minimum size of a native cursor*/
  getMinCursorSize(): number
  /**Determines whether this cursor has timed out */
  hasTimedOut(): boolean
  /**Changes to the next cursor */
  nextCursor(): void
  /**Sets the timeout property to the time it should be changed */
  setTimeout(): void
}
interface OpenGL {
  Display: Display;
  DisplayMode: DisplayMode;
}
interface Display {
  /**Destroys the display */
  destroy(): void
  /**Get the driver adapter string */
  getAdapter(): string
  /**Returns the entire list of possible fullscreen display modes as an array, in no particular order*/
  getAvailableDisplayModes(): DisplayMode[]
  /**Return the initial desktop display mode */
  getDesktopDisplayMode(): DisplayMode
  /**Returns the current display mode, as set by setDisplayMode() */
  getDisplayMode(): DisplayMode
  getHeight(): number
  getPixelScaleFactor(): number
  getTitle(): string
  /**Get the driver version */
  getVersion(): string
  getWidth(): number
  getX(): number
  getY(): number
  /**Returns true if the window is focused */
  isActive(): boolean
  isCloseRequested(): boolean
  isCreated(): boolean
  /**Returns true if the Display's context is current in the current thread */
  isCurrent(): boolean
  /**Determine if the window's contents have been damaged by external events */
  isDirty(): boolean
  isFullscreen(): boolean
  isResizable(): boolean
  isVisible(): boolean
  /**Make the Display the current rendering context for GL calls. */
  makeCurrent(): void
  /**Process operating system events. */
  processMessages(): void
  /**Release the Display content */
  releaseContext(): void
  /**Set the display configuration to the specified gamma, brightness, and contrast */
  setDisplayConfiguration(gamma: number, brightness: number, contrast: number)
  /**Set the current display mode */
  setDisplayMode(mode: DisplayMode): void
  /**Set the mode of the context */
  setDisplayModeAndFullscreen(mode: DisplayMode): void
  /**Set the fullscreen mode of the context */
  setFullscreen(fullscreen: boolean): void
  /**Sets one or more icons for the Display */
  setIcon(icons: Buffer[])
  /**Set the initial color of the Display */
  setInitialBackground(red: number, green: number, blue: number): void
  /**Set the window's location */
  setLocation(x: number, y: number): void
  /**Enable or disable the Display window to be resized */
  setResizable(risazble: boolean): void
  /**Set the buffer swap interval. */
  setSwapInterval(value: number): void
  /**Set the title of the window */
  setTitle(title: string): void
  /**Enable or disable vertical monitor synchronization */
  setVSyncEnabled(sync: boolean): void
  /**Swap the display buffers */
  swapBuffers(): void
  /**An accurate sync method that will attempt to run at a constant frame rate */
  sync(fps: number): void
  /**Update the window */
  update(): void
  wasResized(): boolean
}
interface DisplayMode {
  /**Test for DisplayMode equality */
  equals(obg: object): boolean
  getBitsPerPixel(): number
  getFrequency(): number
  getHeight(): number
  getWidth(): number
  /**Retrieves the hashcode for this object */
  hashCode(): number
  /**True if this instance can be used for fullscreen modes */
  isFullscreenCapable(): boolean
  /**Retries a String representation of this DisplayMode */
  toString(): string
}
interface System {
  /**get the time that has passed since Janurary 1st 1970 in milliseconds. */
  time(): number
}
