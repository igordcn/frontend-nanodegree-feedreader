/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* Suit de testes relacionados a variável allFeeds, que contém
    * um nome e uma url de requisição para cada feed. É a partir
    * dessa variável que a aplicação sabe onde buscar os feeds.
    * Sua correta definição é essencial para o bom funcionamento da
    * principal funcionalidade da aplicação. 
    */
    describe('RSS Feeds', function() {

        /* Teste para verificar se o allFeeds está definido e se é
         * não é um array vazio.
         */
        it('definidos', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Teste para verificar se todas as urls de feeds contidas
         * em allFeeds estão definidas e não são strings vazias.
         */
        it('urls definidas', function(){
            for(const feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toEqual(0);
            }
        });

        /* Teste para verificar se todos os nomes de feeds contidos
         * em allFeeds estão definidos e não são strings vazias.
         */
        it('nomes definidos', function(){
            for(const feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toEqual(0);
            }
        });
    });


    /* Suit de testes para verificar o estado do menu lateral
     * quando se inicia a aplicação e quando se aciona o botão
     * de apresentação/ocultação do menu.
     */
    describe("O menu", function(){
        
        /* Teste que verifica se o menu está escondido inicialmente.
         * Obs: A apresentação e a ocultação do menu são realizadas
         * por, respectivamente, remover e adicionar a classe
         * menu-hidden do body. Assim, quando essa classe está
         * presente, o menu se encontra oculto.
         */
        it('escondido por default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Teste para verificar o correto funcionamento do botão de
         * apresentação/ocultação do menu. Para isso, foi necessário
         * simular o clique do botão através da chamada do método
         * triggerHandler com o parâmetro 'click'.
         */
        it('visivel ao clicar', function(){
            $('.menu-icon-link').triggerHandler('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').triggerHandler('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Suit de testes que verifica se os registros iniciais foram
     * carregados.
     */
    describe('Initial Entries', function(){

        /* Como loadFeed é uma função assíncrona, ela precisa ser
         * executada com antecedência para a realização dos testes.
         * done() sinaliza o termino de sua execução para o início
         * dos testes.
         */
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        /* Verifica se após a chamada de loadFeed, houve pelo menos
         * um registro carregado. 
         */
        it('existe pelo menos um elemento .entry', function(done){
            expect($('.feed .entry').length).toBeGreaterThanOrEqual(1);
            done();
        });
    });

    /* Suit de testes que verifica se um novo feed (um novo 
     * conteúdo) é carregado após ser selecionado.   
     */
    describe('New Feed Selection', function(){
        
        /* Variáveis responsáveis por armazenar o estado dos
         * registros (o conteúdo atual).
         */
        let content, changedContent;

        /* loadFeed(0, function) carrega os registros iniciais.
         * Após seu termino, o contéudo dos registros é salvo
         * na variável content e logo em seguida, um novo feed é
         * carregado com loadFeed(1, function). Como no anterior,
         * o estado dos registros é armazenado (agora, na variável
         * changedContent). E no final done() é chamado para sinalizar
         * a finalização da função assíncrona. 
         */
        beforeEach(function(done){
            loadFeed(0, function(){
                content = $('.feed .entry');
                loadFeed(1, function(){
                    changedContent = $('.feed .entry');
                    done();
                });
            });
        });

        /* Teste que verifica se houve mudança no contéudo
         * da página após a seleção de um novo feed.
         */
        it('O conteudo mudou', function(done){
            expect(content).not.toEqual(changedContent);
            done();
        });
    });
}());
