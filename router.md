# LWC Router

Parametros del router

-   Substring el path posterior al hostname que empieza desde las primer diagonal

Ejemplo

Si href = localhost:8888/root/component.

-   El subpath puede ser /root/component o bien /component.

-   Cada segmento esta delimitado por una diagonal que determina cuál es la ruta del subcomponente solicitado.

-   Los componentes deben poder tener una lógica de renderizado condicional para poder gestionar la lógica del router.

-   La jerarquía de componentes está ligada a los subsegmentos del pathname.

root - /root/component/subcomponent
|
|

-   component - /component/subcomponent
    | |
    | |
    | subcomponent /subcomponent
    |
    |
-   other

Cada componente que sea afectado por el pathname debe seguir el siguiente algoritmo, aquellos que no son afectados deberan solamente pasar el subpath hacia sus componentes hijos:

- Se obtiene el subpath eliminando el segmento del propio componente.

- Se desea gestionar el subpath en el mismo componente de modo que se renderize
condicionalmente a sus hijos directos?

	- *Afirmativo*: Se obtiene el primer segmento del subpath. 
	- *Negativo*: Se pasa como parametros el subpath hacia los componentes hijos que se veran afectados por el subpath. 

2. 

1. Obtener el subpath del pathname.