<?php
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

require dirname(__DIR__) . '/vendor/autoload.php';

class Chat implements MessageComponentInterface {
    protected $clients;
    protected $folios;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->folios = [];
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        echo "Nueva conexión: ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $msgData = json_decode($msg, true);

        if (isset($msgData['folio'])) {
            $this->folios[$from->resourceId] = $msgData['folio'];
        } else {
            $folio = $this->folios[$from->resourceId];
            $mensaje = [
                'folio' => $folio,
                'texto' => $msgData['texto'],
                'path' => $msgData['path']
            ];

            foreach ($this->clients as $client) {
                if ($this->folios[$client->resourceId] === $folio) {
                    $client->send(json_encode($mensaje));
                }
            }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);
        unset($this->folios[$conn->resourceId]);
        echo "Conexión cerrada: ({$conn->resourceId})\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "Error: ({$conn->resourceId}): {$e->getMessage()}\n";
        $conn->close();
    }
}

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Chat()
        )
    ),
    80
);

$server->run();
?>
