<?php

require_once 'vendor/autoload.php';

use GraphAware\Neo4j\Client\ClientBuilder;

$client = ClientBuilder::create()
    ->addConnection('default', 'http://neo4j:password@localhost:7474') // Example for HTTP connection configuration (port is optional)
    ->addConnection('bolt', 'bolt://neo4j:password@localhost:7687') // Example for BOLT connection configuration (port is optional)
    ->build();

$result = $client->run("MATCH (from:Page {title:\"" . $_REQUEST['title'] . "\"}), (to:Page {title:\"Adolf Hitler\"}) ,
path = shortestPath((from)-[:Link*]->(to))
RETURN path");

// get the first or (if expected only one) the only record
$record = $result->firstRecord();

$path = $record->values()[0];

$nodes = array();

foreach($path->nodes() as $node ) {
    $title = $node->values()["title"];
    array_push($nodes,$title);
}

echo json_encode($nodes);
exit();
