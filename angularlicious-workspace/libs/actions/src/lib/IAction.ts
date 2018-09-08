/**
 * Defines the interface for an action.
 */
export interface IAction {
  /**
   * All actions are required to implement the [execute] method.
   */
  execute(): void;
}
