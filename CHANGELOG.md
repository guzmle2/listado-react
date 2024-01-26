- Descargars el proyecto pero el ambiente no esta habilitado para el desarrollo ni en node v12 v14 v16 t v18
  - existe 2 ficheros config tsconfig.json y jsconfig.json se deja tsconfig.json para proceder con typescript 
  - la version de typescript definida en el package.json da error de conflicto se actualizar react-scripts y typescript
  - Dada las librerias se pasa a compilar en v16
  - Hay ficheros importados de scss pero el package no esta habilitado para usar scss se instala node-sass dada la version que soporta segun las librerias principales definidas
    - La version de nodesass tambien daba error se termino instalando  npm install `node-sass@6 --save`

