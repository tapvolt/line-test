
vpype read 156-horizontal-image.svg write --device hp7475a --page-size a3 156-horizontal.hpgl



vpype read 156-horizontal-image.svg layout --fit-to-margins 3cm --valign top a3 write --device hp7475a --page-size a3 156-horizontal.hpgl 


vpype read image.svg --attr stroke layout --fit-to-margins 3cm --valign top a3 write --device hp7475a --page-size a3 156-horizontal.hpgl