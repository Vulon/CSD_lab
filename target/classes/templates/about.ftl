<#import "/spring.ftl" as spring/>

<!DOCTYPE HTML>
<html lang="ru">
<head>
    <meta charset="UTF-8" />
    <title>Welcome</title>

    <link rel="stylesheet" href="base.css">
</head>

<body>

<#include "navmenu.ftl">

<div class="container">
    <p>${author}</p>
    <p>${group}</p>
    <p>${task}</p>
    <p>Текст задания: </p>
    <div class="container">
        ${text}
    </div>
</div>



</body>

</html>