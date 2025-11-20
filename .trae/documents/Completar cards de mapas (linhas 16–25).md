## Objetivo

Completar os cards para as imagens restantes nas linhas 16–25 de `src/app/features/nades/pages/nades/nades.page.html`, seguindo o mesmo padrão visual de `.cardMap` já usado para Mirage.

## Abordagem Direta (HTML estático)

1. Substituir cada `<img>` das linhas 16–25 por um bloco:

```
<div class="cardMap">
  <img class="map-image" src="assets/images/maps/de_<map>.png" alt="">
  <img class="logo-map" src="<logoUrl>" alt="<Map> map">
</div>
```

1. Mapear cada item:

* Nuke → `assets/images/maps/de_nuke.png` + logo da linha 16

* Overpass → `assets/images/maps/de_overpass.png` + logo da linha 17

* Inferno → `assets/images/maps/de_inferno.png` + logo da linha 18

* Dust2 → `assets/images/maps/de_dust2.png` + logo da linha 19

* Train → `assets/images/maps/de_train.png` + logo da linha 20

* Cobblestone → (asset faltante) + logo da linha 21

* Cache → `assets/images/maps/de_cache.png` + logo da linha 22

* Vertigo → `assets/images/maps/de_vertigo.png` + logo da linha 23

* Anubis → `assets/images/maps/de_anubis.png` + logo da linha 24

* Ancient → `assets/images/maps/de_ancient.png` + logo da linha 25

1. Manter os estilos existentes definidos em `nades.page.css` (`.cardMap`, `.map-image`, `.logo-map`).

## Asset Faltante (Cobblestone)

* Não existe `assets/images/maps/de_cobblestone.png` no projeto.

* Opções:

  * Adicionar o asset correto para Cobblestone.

  * Usar um placeholder temporário (por exemplo `de_dust2.png`) até o asset correto estar disponível.

* Proponho adicionar o asset correto; se não houver disponível agora, aplico placeholder até incluirmos o arquivo.

## Refatoração Opcional (mais sustentável)

Para simplificar manutenção, podemos gerar os cards via `*ngFor`:

1. Em `nades.page.ts`, importar `CommonModule` em `imports` e declarar um array `maps` com `{ key, baseSrc, logoSrc, alt }`.
2. Em `nades.page.html`, substituir os blocos repetidos por:

```
<div class="cardMap" *ngFor="let m of maps">
  <img class="map-image" [src]="m.baseSrc" alt="">
  <img class="logo-map" [src]="m.logoSrc" [alt]="m.alt">
</div>
```

1. Manter o placeholder para Cobblestone até incluirmos o asset.

## Entregáveis

* Linhas 16–25 atualizadas para cards consistentes.

* Opcional: refatoração com `*ngFor` para reduzir duplicação.

* Tratativa do asset de Cobblestone (inclusão ou placeholder).

