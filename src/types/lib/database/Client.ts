interface Client {
    /**
     * Establish a database connection.
     *
     * @return {Promise<void>}
     */
    connect(): Promise<void>;

    /**
     * Close a database connection.
     *
     * @return {Promise<void>}
     */
    disconnect(): Promise<void>;
}

export default Client;
