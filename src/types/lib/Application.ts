interface Application {
    /**
     * Boot the application.
     *
     * @return {Promise<void>}
     */
    boot(): Promise<void>;

    /**
     * Quit the application.
     *
     * @return {Promise<void>}
     */
    quit(): Promise<void>;
}

export default Application;
