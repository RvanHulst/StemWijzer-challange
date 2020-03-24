Tim van eert 
99051246@mydavinci.nl
_____________________

Tim Heeft de code nageken en kwam achter een paar bugs voor de rest was alles goed

==============================================================================

Bug 1: dat die 29 antwoorden opslaadt inplaats van 30 , 

Bug 2: Dat extra punten automatish aan bleef staan terwijl die handmattig moest

===============================================================================

Bug 1 oplossing : Mij Array.push stond na de end.question check en daardoor pushde het laatste antwoord niet mee

Bug 2 oplossing : Was vergeten checkbox.checked naar false te zetten na elke button 

=======================================================================================================================
                                    =                                    =  
                                    = code aanpassingen voor de toekomst =
                                    =____________________________________=


1) De let DOM Ellement naar een const moest veranderen vanwege dat deze nooit veranderd.

2) Meer constant zijn met variablen namen.

3) Het benoemen voor id's better maken
 
=======================================================================================================================
                                          = Voor de volgende keer =
	                                      =_______________________=

volgende keer moet ik Dom elementen in container stoppen zodat je niet voor elk element apart de display moet veranderen