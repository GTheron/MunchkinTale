define([],
function(){
	function XTextualNodePlayer(params)
	{
		// global
		this.o_projet = {};
		this.main = params.main;

		this.arr_planches = [];

		this.arr_hash_variables = []; // contient les variables de type integer
		this.arr_hash_chaines = []; // contient les variables de type string

		// lecture
		this.no_planche_en_cours_tester = 0;
		this.no_pn_en_cours_tester = 0;

		this.arr_planches_recursives = []; // sert à rien ?

		this.pn_en_cours_tester = {};

		this.no_choix_tester = 0;

		this.nb_planches_tester = 0;

		this.s_nom_variable_chaine_en_cours = "";
	}

	XTextualNodePlayer.prototype =
	{
		tester: function()
		{
			//console.log('tester()');

			this.arr_hash_variables = []; // on efface les variables locales
			this.arr_hash_chaines = [];

			this.arr_planches = this.o_projet.arr_planches;

			this.nb_planches_tester = this.arr_planches.length;

			this.no_planche_en_cours_tester = 0;
			this.no_pn_en_cours_tester = -1;

			this.arr_planches_recursives = [];

			this.s_nom_variable_chaine_en_cours = "";

			this.progression_pn("suivant");

		},
		progression_pn: function(comment)
		{
			//console.log("----------------------------------");
			//console.log("no_planche_en_cours_tester",this.no_planche_en_cours_tester,"no_pn_en_cours_tester",this.no_pn_en_cours_tester);

			if( comment == "choix" )
			{
				//console.log('this.arr_planches :', this.arr_planches);
				//console.log('this.arr_planches[no_planche].arr_pns : ', this.arr_planches[this.no_planche_en_cours_tester].arr_pns);
				//console.log(this.arr_planches[this.no_planche_en_cours_tester].arr_pns[this.no_pn_en_cours_tester].arr_pointeurs);
				this.no_pn_en_cours_tester = this.arr_planches[this.no_planche_en_cours_tester].arr_pns[this.no_pn_en_cours_tester].arr_pointeurs[this.no_choix_tester];
			}
			else // uniquement pour depart
			{
				//console.log("suivant");
				this.no_pn_en_cours_tester++;
			}

			console.log("no_pn_en_cours_tester",this.no_pn_en_cours_tester);

			this.pn_en_cours_tester = this.arr_planches[this.no_planche_en_cours_tester].arr_pns[this.no_pn_en_cours_tester];

			if( this.pn_en_cours_tester.type == 7 ) // fin
			{
				//console.log("FIN ?");
				if( this.arr_planches_recursives.length == 0 )
				{
					//console.log("FIN DU JEU");
					this.dire_interface_fermer_player();
				}
				else
				{
					//console.log("RECURSIF");
					this.no_planche_en_cours_tester = this.arr_planches_recursives[this.arr_planches_recursives.length-1][0];
					this.no_pn_en_cours_tester = this.arr_planches_recursives[this.arr_planches_recursives.length-1][1];
					//console.log(this.no_planche_en_cours_tester,this.no_pn_en_cours_tester);
					this.arr_planches_recursives.pop();

					this.no_choix_tester = 1;
					this.progression_pn("choix");
				}
			}
			else if( this.pn_en_cours_tester.type <= 5 ) // PN
			{
				//console.log("PN");
				this.traiter_pn();
			}
			else if( this.pn_en_cours_tester.type == 9 ) // planche
			{
				//console.log("NOUVELLE PLANCHE");

				this.no_planche_en_cours_tester = this.chercher_no_planche_tester(this.pn_en_cours_tester.vers_planche,"planche");
				//console.log(this.no_planche_en_cours_tester,this.pn_en_cours_tester.vers_planche);
				this.no_pn_en_cours_tester = -1;
				this.progression_pn("suivant");
			}
			else if( this.pn_en_cours_tester.type == 17 ) // planche recursive
			{
				//console.log("NOUVELLE PLANCHE RECURSIVE");

				this.arr_planches_recursives.push( [this.no_planche_en_cours_tester,this.no_pn_en_cours_tester] );

				this.no_planche_en_cours_tester = this.chercher_no_planche_tester(this.pn_en_cours_tester.vers_planche,"planche");
				//console.log(this.no_planche_en_cours_tester,this.pn_en_cours_tester.vers_planche);
				this.no_pn_en_cours_tester = -1;
				this.progression_pn("suivant");
			}
			else if( this.pn_en_cours_tester.type == 19 ) // planche recursive pour une chaine
			{
				//console.log("NOUVELLE PLANCHE RECURSIVE POUR CHAINE");

				this.s_nom_variable_chaine_en_cours = this.pn_en_cours_tester.variable;
				this.arr_hash_chaines[this.s_nom_variable_chaine_en_cours] = "";

				this.arr_planches_recursives.push( [this.no_planche_en_cours_tester,this.no_pn_en_cours_tester] );

				this.no_planche_en_cours_tester = this.chercher_no_planche_tester(this.pn_en_cours_tester.planche,"chaine");
				//console.log(this.no_planche_en_cours_tester,this.pn_en_cours_tester.planche);
				this.no_pn_en_cours_tester = -1;
				this.progression_pn("suivant");
			}
			else if( this.pn_en_cours_tester.type == 8 ) // commande
			{
				console.log("COMMANDE");

				this.traiter_commande();
			}
			else if( this.pn_en_cours_tester.type == 10 || this.pn_en_cours_tester.type == 11 ) // connecteur
			{
				//console.log("CONNECTEUR");

				this.no_choix_tester = 1;
				this.progression_pn("choix");
			}
			else if( this.pn_en_cours_tester.type == 12 ) // random
			{
				//console.log("RANDOM");

				var arr_temp = [];
				for( var i = 1 ; i < this.pn_en_cours_tester.arr_pointeurs.length; i++ )
				{
					if( this.pn_en_cours_tester.arr_pointeurs[i] != -1 )
					{
						arr_temp.push(i);
					}
				}

				this.no_choix_tester = arr_temp[ parseInt(Math.random()*arr_temp.length) ];
				this.progression_pn("choix");
			}
			else if( this.pn_en_cours_tester.type >= 13 && this.pn_en_cours_tester.type <= 16 ) // conditions
			{
				//console.log("CONDITIONS");
				this.traiter_conditions();
			}
			else // depart
			{
				//console.log("DEPART");

				this.no_choix_tester = 1;
				this.progression_pn("choix");
			}
		},
		traiter_pn: function()
		{
			var s_texte = "";
			var s_sub_texte = "";

			if( this.arr_planches[this.no_planche_en_cours_tester].s_type == "planche" )
			{
				this.dire_interface_type_pn(this.pn_en_cours_tester.type);

				// texte et variables
				s_texte = this.extraire_variables(this.pn_en_cours_tester.texte);

				this.dire_interface_texte_0(s_texte);

				// les choix
				for( var i = 0 ; i < this.pn_en_cours_tester.arr_choix.length; i++ )
				{
					//console.log("titre",this.pn_en_cours_tester.arr_choix[i].titre);

					if( this.extraire_et_verifier_conditions(this.pn_en_cours_tester.arr_choix[i].titre) )
					{
						//console.log(this.pn_en_cours_tester.arr_choix[i].texte);
						s_sub_texte = this.pn_en_cours_tester.arr_choix[i].texte;

						if( s_sub_texte.indexOf("$") != -1 )
						{
							s_sub_texte = this.convertir_les_chaines(s_sub_texte);
						}

						this.dire_interface_texte_btn(i, s_sub_texte);
					}
					else // choix non valide
					{
						//console.log("btn_choix_"+(i+1),"non valide");

						this.dire_interface_texte_btn(i, "");
					}
				}
			}
			else
			{
				s_texte = this.extraire_variables(this.pn_en_cours_tester.texte);

				this.arr_hash_chaines[this.s_nom_variable_chaine_en_cours] += s_texte;

				// les choix
				for( var i = 0 ; i < this.pn_en_cours_tester.arr_choix.length; i++ )
				{
					//console.log("titre",this.pn_en_cours_tester.arr_choix[i].titre);

					if( this.extraire_et_verifier_conditions(this.pn_en_cours_tester.arr_choix[i].titre) )
					{
						//console.log(this.pn_en_cours_tester.arr_choix[i].texte);
						s_sub_texte = this.pn_en_cours_tester.arr_choix[i].texte;

						if( s_sub_texte.indexOf("$") != -1 )
						{
							s_sub_texte= this.convertir_les_chaines(s_sub_texte);
						}

						this.arr_hash_chaines[this.s_nom_variable_chaine_en_cours] += s_sub_texte;
					}
					else // choix non valide
					{
						//console.log("btn_choix_"+(i+1),"non valide");

						//this.dire_interface_texte_btn(i, "");
					}
				}

				this.no_choix_tester = 1;
				this.progression_pn("choix");

				//console.log("arr_hash_chaines[s_nom_variable_chaine_en_cours]",this.arr_hash_chaines[this.s_nom_variable_chaine_en_cours]);
			}
		},
		traiter_conditions: function()
		{
			this.dire_interface_type_pn(this.pn_en_cours_tester.type);

			var b = false;

			// les choix
			for( var i = 0 ; i < this.pn_en_cours_tester.arr_conditions.length; i++ )
			{
				//console.log("texte",this.pn_en_cours_tester.arr_conditions[i].texte);

				if( this.extraire_et_verifier_conditions(this.pn_en_cours_tester.arr_conditions[i].texte) )
				{
					this.no_choix_tester = i + 1;
					//console.log("no_choix_tester",this.no_choix_tester);

					this.progression_pn("choix");

					b = true;
					break;

				}
			}

			if( !b )
			{
				//console.log("ELSE");
				this.no_choix_tester = this.pn_en_cours_tester.arr_conditions.length + 1;
				//console.log("no_choix_tester",this.no_choix_tester);
				this.progression_pn("choix");
			}
		},
		traiter_commande: function()
		{
			//console.log(this.pn_en_cours_tester.commande);

			var s_texte = this.extraire_variables(this.pn_en_cours_tester.commande);

			if( s_texte != "" )
			{
				this.dire_interface_commande(s_texte);
			}
			else
			{
				this.no_choix_tester = 1;
				this.progression_pn("choix");
			}
		},
		e_interface_retour_commande: function()
		{
			this.no_choix_tester = 1;
			this.progression_pn("choix");
		},
		e_interface_choix_pn: function(no)
		{
			this.no_choix_tester = no;
			console.log("no_choix_tester",this.no_choix_tester);

			this.progression_pn("choix");
		},
		chercher_no_planche_tester: function(s,s_type)
		{
			//console.log("----------------------------------------------- chercher_no_planche_tester(",s,", ",s_type,")");

			var i = 0;
			for( i = 0 ; i < this.nb_planches_tester; i++ )
			{
				//console.log(this.arr_planches[i].s_nom_de_la_planche,this.arr_planches[i].s_type);
				if( this.arr_planches[i].s_nom_de_la_planche == s && this.arr_planches[i].s_type == s_type )
				{
					return i;
				}
			}
			return 0; // impossible
		},
		extraire_variables: function(s)
		{
			//console.log("----------------------------------------------- extraire_variables");
			//console.log(s);

			// conversion des chaines $var
			if( s.indexOf("$") != -1 )
			{
				s = this.convertir_les_chaines(s);
			}

			// conversion des var integer
			if( s.indexOf("var ") == 0 )
			{
				var arr_textes_variables = [];

				var b = false;

				while( !b )
				{
					if( s.indexOf("\r") != -1 )
					{
						arr_textes_variables.push( s.substring(4, s.indexOf("\r")) );

						s = s.substring(s.indexOf("\r")+1);
					}
					else if( s.indexOf("\n") != -1 )
					{
						arr_textes_variables.push( s.substring(4, s.indexOf("\n")) );

						s = s.substring(s.indexOf("\n")+1);
					}
					else
					{
						arr_textes_variables.push( s.substring(4) );

						s = "";
					}
					//console.log("s",s);
					if( s.indexOf("var ") == -1 ) b = true;
				}

				//console.log("arr des variables",arr_textes_variables);
				this.executer_variables(arr_textes_variables);
			}

			return s;
		},
		executer_variables: function(arr)
		{
			//console.log("----------------------------------------------- executer_variables");
			var s = "";
			var s_nom_variable = "";
			var n_result = -1;

			for( var i = 0 ; i < arr.length ; i++ )
			{
				s = arr[i];
				//console.log(s);

				if( s.indexOf("global") == -1 )
				{
					s = s.split(" ").join(""); // on vire les espaces

					// = += -= ++ --
					if( s.indexOf("+=") != -1 )
					{
						s_nom_variable = s.substring(0,s.indexOf("+="));

						if( this.arr_hash_variables[s_nom_variable] == undefined )
						{
							if( s.indexOf("random(") != -1 ) this.arr_hash_variables[s_nom_variable] = parseInt( Math.random() * parseInt( s.substring(s.indexOf("random(")+7, s.indexOf(")")) ) );
							else this.arr_hash_variables[s_nom_variable] = parseInt( s.substring(s.indexOf("=")+1) );
						}
						else
						{
							if( s.indexOf("random(") != -1 ) this.arr_hash_variables[s_nom_variable] = parseInt( Math.random() * parseInt( s.substring(s.indexOf("random(")+7, s.indexOf(")")) ) );
							else this.arr_hash_variables[s_nom_variable] += parseInt( s.substring(s.indexOf("=")+1) );
						}
					}
					else if( s.indexOf("-=") != -1 )
					{
						s_nom_variable = s.substring(0,s.indexOf("-="));

						if( this.arr_hash_variables[s_nom_variable] == undefined )
						{
							if( s.indexOf("random(") != -1 ) this.arr_hash_variables[s_nom_variable] = parseInt( Math.random() * parseInt( s.substring(s.indexOf("random(")+7, s.indexOf(")")) ) );
							else this.arr_hash_variables[s_nom_variable] = parseInt( s.substring(s.indexOf("=")+1) );
						}
						else
						{
							if( s.indexOf("random(") != -1 ) this.arr_hash_variables[s_nom_variable] = parseInt( Math.random() * parseInt( s.substring(s.indexOf("random(")+7, s.indexOf(")")) ) );
							else this.arr_hash_variables[s_nom_variable] -= parseInt( s.substring(s.indexOf("=")+1) );
						}
					}
					else if( s.indexOf("=") != -1 )
					{
						s_nom_variable = s.substring(0,s.indexOf("="));

						if( s.indexOf("random(") != -1 ) this.arr_hash_variables[s_nom_variable] = parseInt( Math.random() * parseInt( s.substring(s.indexOf("random(")+7, s.indexOf(")")) ) );
						else this.arr_hash_variables[s_nom_variable] = parseInt( s.substring(s.indexOf("=")+1) );
					}
					else if( s.indexOf("++") != -1 )
					{
						s_nom_variable = s.substring(0,s.indexOf("++"));

						if( this.arr_hash_variables[s_nom_variable] == undefined )
						{
							this.arr_hash_variables[s_nom_variable] = 1;
						}
						else
						{
							this.arr_hash_variables[s_nom_variable] += 1;;
						}
					}
					else if( s.indexOf("--") != -1 )
					{
						s_nom_variable = s.substring(0,s.indexOf("--"));

						if( this.arr_hash_variables[s_nom_variable] == undefined )
						{
							this.arr_hash_variables[s_nom_variable] = -1;
						}
						else
						{
							this.arr_hash_variables[s_nom_variable] -= 1;
						}
					}
				}
				else // var global
				{
					//console.log("c une variable globale");

					s = s.substring(s.indexOf("global")+6);

					s = s.split(" ").join(""); // on vire les espaces

					// = += -= ++ --
					if( s.indexOf("+=") != -1 )
					{
						//console.log("+=");
						s_nom_variable = s.substring(0,s.indexOf("+="));

						if( main[s_nom_variable] == undefined )
						{
							if( s.indexOf("random(") != -1 ) main[s_nom_variable] = parseInt( Math.random() * parseInt( s.substring(s.indexOf("random(")+7, s.indexOf(")")) ) );
							else main[s_nom_variable] = parseInt( s.substring(s.indexOf("=")+1) );
						}
						else
						{
							if( s.indexOf("random(") != -1 ) main[s_nom_variable] = parseInt( Math.random() * parseInt( s.substring(s.indexOf("random(")+7, s.indexOf(")")) ) );
							else main[s_nom_variable] += parseInt( s.substring(s.indexOf("=")+1) );
						}
					}
					else if( s.indexOf("-=") != -1 )
					{
						//console.log("-=");
						s_nom_variable = s.substring(0,s.indexOf("-="));

						if( main[s_nom_variable] == undefined )
						{
							if( s.indexOf("random(") != -1 ) main[s_nom_variable] = parseInt( Math.random() * parseInt( s.substring(s.indexOf("random(")+7, s.indexOf(")")) ) );
							else main[s_nom_variable] = parseInt( s.substring(s.indexOf("=")+1) );
						}
						else
						{
							if( s.indexOf("random(") != -1 ) main[s_nom_variable] = parseInt( Math.random() * parseInt( s.substring(s.indexOf("random(")+7, s.indexOf(")")) ) );
							else main[s_nom_variable] -= parseInt( s.substring(s.indexOf("=")+1) );
						}
					}
					else if( s.indexOf("=") != -1 )
					{
						//console.log("=");
						s_nom_variable = s.substring(0,s.indexOf("="));

						if( s.indexOf("random(") != -1 ) main[s_nom_variable] = parseInt( Math.random() * parseInt( s.substring(s.indexOf("random(")+7, s.indexOf(")")) ) );
						else main[s_nom_variable] = parseInt( s.substring(s.indexOf("=")+1) );
					}
					else if( s.indexOf("++") != -1 )
					{
						//console.log("++");
						s_nom_variable = s.substring(0,s.indexOf("++"));

						if( main[s_nom_variable] == undefined )
						{
							main[s_nom_variable] = 1;
						}
						else
						{
							main[s_nom_variable] += 1;;
						}
					}
					else if( s.indexOf("--") != -1 )
					{
						//console.log("--");
						s_nom_variable = s.substring(0,s.indexOf("--"));

						if( main[s_nom_variable] == undefined )
						{
							main[s_nom_variable] = -1;
						}
						else
						{
							main[s_nom_variable] -= 1;
						}
					}

					//console.log("this[s_nom_variable]",main[s_nom_variable]);
				}
			}

			//console.log("arr des variables",arr);
		},
		extraire_et_verifier_conditions: function(s)
		{
			//console.log("----------------------------------------------- extraire_et_verifier_conditions");
			var arr_textes_conditions = [];

			// conversion des chaines $var
			if( s.indexOf("$") != -1 )
			{
				s = this.convertir_les_chaines(s);
			}

			// gestion des && et des ||
			if( s.indexOf("&&") != -1 )
			{
				arr_textes_conditions = s.split("&&");
			}
			else if( s.indexOf("||") != -1 )
			{
				arr_textes_conditions = s.split("||");
			}
			else
			{
				arr_textes_conditions[0] = s;
			}
			//console.log("arr_textes_conditions",arr_textes_conditions);

			// gestion des == >= <=
			for( var i = 0 ; i < arr_textes_conditions.length ; i++ )
			{
				var ss = arr_textes_conditions[i];

				if( ss.indexOf("global") == -1 )
				{
					ss = ss.split(" ").join(""); // on vire les espaces

					if( ss.indexOf("=") != -1 )
					{
						var s_nom_variable = ss.substring(0,ss.lastIndexOf("=")-1);

						var s_type_condition = ss.substr(ss.lastIndexOf("=")-1,2);

						var i_nb = parseInt( ss.substring(ss.lastIndexOf("=")+1) );

						//console.log("s_nom_variable",s_nom_variable,"s_type_condition",s_type_condition,"i_nb",i_nb);

						// on teste la condition
						if( this.arr_hash_variables[s_nom_variable] == undefined ) // la variable n'a pas encore été déclarée
						{
							//console.log("var non déclarée");
							return false;
						}
						else if( s_type_condition == "==" && this.arr_hash_variables[s_nom_variable] != i_nb )
						{
							return false;
						}
						else if( s_type_condition == ">=" && this.arr_hash_variables[s_nom_variable] < i_nb )
						{
							return false;
						}
						else if( s_type_condition == "<=" && this.arr_hash_variables[s_nom_variable] > i_nb )
						{
							return false;
						}
					}
				}
				else // var global
				{
					ss = ss.substring(ss.indexOf("global")+6);
					ss = ss.split(" ").join("");

					if( ss.indexOf("=") != -1 )
					{
						var s_nom_variable = ss.substring(0,ss.lastIndexOf("=")-1);

						var s_type_condition = ss.substr(ss.lastIndexOf("=")-1,2);

						var i_nb = parseInt( ss.substring(ss.lastIndexOf("=")+1) );

						//console.log("s_nom_variable",s_nom_variable,"s_type_condition",s_type_condition,"i_nb",i_nb);

						// on teste la condition
						if( main[s_nom_variable] == undefined ) // la variable n'a pas encore été déclarée
						{
							//console.log("var global non déclarée");
							return false;
						}
						else if( s_type_condition == "==" && main[s_nom_variable] != i_nb )
						{
							//console.log("==");
							return false;
						}
						else if( s_type_condition == ">=" && main[s_nom_variable] < i_nb )
						{
							//console.log(">=");
							return false;
						}
						else if( s_type_condition == "<=" && main[s_nom_variable] > i_nb )
						{
							//console.log("<=");
							return false;
						}
					}
				}
			}

			return true;
		},
		convertir_les_chaines: function(s)
		{
			//console.log("----------------------------------------------- convertir_les_chaines");
			//console.log(s);

			var reg = /\$[a-z_0-9]+/g;
			var arr = s.match(reg);

			//console.log("arr",arr);
			if( arr.length != 0 )
			{
				for( var i = 0 ; i < arr.length ; i++ )
				{
					//console.log("arr_hash_chaines["+arr[i]+"] = ",this.arr_hash_chaines[arr[i]]);

					if( this.arr_hash_chaines[arr[i]] != undefined )
					{
						//reg = new RegExp("\\"+arr[i], "g"); // BON !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
						reg = "\\"+arr[i]+"g";
						//console.log(reg);
						//console.log(s,s.search(reg));
						s = s.replace(reg,this.arr_hash_chaines[arr[i]]);
						//console.log(s,s.search(reg));
					}
					else
					{
						//reg = new RegExp("\\"+arr[i], "g"); // BON !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
						reg = "\\"+arr[i]+"g";
						s = s.replace(reg,"");
					}
				}
			}

			return s;
		},
		charger: function(o)
		{
			//console.log("charger()",o);
			//this.o_projet = com.adobe.serialization.json.JSON.decode( this.changer_guillemets(s,false) ) as Object;
			//this.o_projet = JSON.parse( s );
			this.o_projet = o;
			//this.o_projet = JSON.parse( this.changer_guillemets(s,false) );

			// on vérifie que les planches aient toutes un type
			for( var i = 0 ; i < this.o_projet.arr_planches.length ; i++ )
			{
				//console.log("Type planche : "+this.o_projet.arr_planches[i].s_type);

				if( this.o_projet.arr_planches[i].s_type == undefined ) this.o_projet.arr_planches[i].s_type = "planche";
			}

			this.dire_interface_o_projet_dispo();
		},
		changer_guillemets: function(s,b_sens)
		{
			//var reg:RegExp;
			var reg = /"/g;;

			if( b_sens )
			{
				reg = /"/g;
				return s.replace(reg,"`");
			}
			else
			{
				reg = /`/g;
				return s.replace(reg,"\"");
			}
			return s;
		},
		dire_interface_fermer_player: function()
		{
			//console.log("dire_interface_fermer_player()");

			this.main.e_dire_interface_fermer_player();
		},
		dire_interface_o_projet_dispo: function()
		{
			//console.log("dire_interface_o_projet_dispo()");
			//console.log("main", this.main);
			this.main.e_dire_interface_o_projet_dispo();
		},
		dire_interface_type_pn: function(no)
		{
			//console.log("dire_interface_type_pn");
			this.main.e_dire_interface_type_pn(no);
		},
		dire_interface_texte_0: function(s)
		{
			//console.log("dire_interface_texte_0()");

			this.main.e_dire_interface_texte_0(s);
		},
		dire_interface_texte_btn: function(no, s)
		{
			//console.log("dire_interface_texte_btn()");

			this.main.e_dire_interface_texte_btn(no,s);
		},
		dire_interface_commande: function(s)
		{
			//console.log("dire_interface_commande()");

			this.main.e_dire_interface_commande(s);
		}
	};
	XTextualNodePlayer.prototype.constructor = XTextualNodePlayer;

	return XTextualNodePlayer;
});
