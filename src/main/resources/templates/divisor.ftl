<#import "/spring.ftl" as spring/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Divisor</title>
    <link rel="stylesheet" href="base.css">
    <script src="DivisorHandler.js"></script>
</head>
<body>
<#include "navmenu.ftl">
<div class="container">
    <h2>${divisor}</h2>
    <input type="number" id="start_input" placeholder="Start Number" class="input_field">
    <br>
    <input type="number" id="end_input" placeholder="End Number" class="input_field">
    <br>
    <button id="submit_button" class="submit" onclick="submitRequest()">${submit}</button>
    <br>
    <textarea id="response_area" class="response_area"></textarea>
</div>
</body>
</html>