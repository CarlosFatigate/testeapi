<!DOCTYPE html>
<html lang="pt-br">

<head>

    <!-- meta tags -->
    <meta charset="Teste de PHP API Restfull" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>
        Teste de PHP API Restfull
    </title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <script src="./site/dist/bundle.js"></script>
</head>

<body>
    <div class="header">
        <div class="content">
            <h1>Teste</h1>
            <div class="search-box">
                <input name="seach" id="search" class="search-bar" placeholder="Buscar veículo" />
                <button class="search-bar-btn search-btn" onclick="getCars()"><img src="site/assets/img/search.png" alt="Buscar veículo" /> </button>
                <input type="button" class="search-bar-btn create-btn" onclick="createVehicle()" value="+" />
            </div>
        </div>
    </div>
    <div class="divider"></div>
    <div class="content">
        <div class="grid">
            <div class="cars">
                <h2>Lista de veículos</h2>
                <div id="car-list-box">
                    <ul id="car-list"></ul>
                </div>
                <div class="page-box">
                    <input type="hidden" name="page" id="page" />
                    <input type="hidden" name="lastPage" id="lastPage" />
                    <a class="link-page" onclick="firstPage()"> <<</a>
                    <a class="link-page" onclick="prevPage()"> <</a>
                    <a class="link-page" onclick="nextPage()"> ></a>
                    <a class="link-page" onclick="lastPage()"> >></a>
                </div>
                <div class="clear"></div>
            </div>
            <div class="car-info">
                <h2>Detalhes do veículo</h2>
                <div class="car-details"></div>
            </div>
        </div>
    </div>
    <div class="modal-edit hide" id="modal-edit">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Detalhes</h3>
                <button onclick="hideModal()">X</button>
                <div class="clear"></div>
            </div>
            <form id="form-edit">
                <div class="vehicle-name-box">
                    <label class="form-label" for="name">Veículo</label>
                    <input type="text" id="name" name="name" class="form-input" value="" />
                </div>
                <div class="grid">
                    <div>
                        <label class="form-label" for="brand">Marca</label>
                        <input type="text" id="brand" name="brand" class="form-input" value="" />
                    </div>
                    <div>
                        <label class="form-label" for="year">Ano</label>
                        <input type="number" max=9999 min=1700 id="year" name="year" class="form-input" value="" />
                    </div>
                </div>
                <div class="vehicle-description-box">
                    <label class="form-label" for="description">Descrição</label>
                    <textarea id="description" class="form-input" rows="5"></textarea>
                </div>
                <div class="vehicle-sold-box">
                    <input type="checkbox" id="sold" name="sold" class="form-checkbox" />
                    <input type="hidden" name="idVehicle" id="idVehicle"/>
                    <label class="form-label" for="sold">Vendido</label>
                </div>
                <div class="action-button-box">
                    <p class="delete-button" onclick="deleteVehicle()">Apagar</p>
                    <p class="action-button" onclick="saveVehicle()">Salvar</p>
                    <div class="clear"></div>
                </div>
            </form>
        </div>
    </div>
</body>

</html>
<script>
    $('document').ready(async function() {
        await getCars();
    });
</script>