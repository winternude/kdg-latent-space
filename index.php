
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title></title>
        <link rel="stylesheet" href="./styles/reset.css">
        <link rel="stylesheet" href="./styles/base.css">
        <link rel="stylesheet" href="./styles/style.css">
        <link rel="stylesheet" href="./styles/fonts.css">

    </head>
    <body class="active-intro">
        <div class="background"></div>

        <h1>Choose your Character: Generative AI as an MMORPG</h1>

        <main>
            <?php  include("./snippets/intro.php"); ?>     
            <?php  include("./snippets/questionnaire.php"); ?>   
            <?php  include("./snippets/result.php"); ?>     
        </main> 
        
    </body>
    <script src="./scripts/handleQuestionnaire.js"></script>
</html>