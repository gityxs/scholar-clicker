var debug = false;
var debug_multiplier = 1;

var math_calc_multiplier = 1.1;
var math_code_multiplier = 1.1;
var math_money_multiplier = 1.1;
var cs_code_multiplier = 1.10;
var cs_calc_multiplier = 1.15;
var cs_money_multiplier = 1.15;
var cs_bug_multiplier = 1.20;

var button_width = 156.0 //must match css size
var infinity = 1000000000000000000 // very large number, might as well be infinity


var notification_box = document.getElementById('notifications');

var note_list = new Array();
var note_text_list = new Array();

var resource_list = ['effort','money','calculations','code','tflops']; //ordered list of resources
//resource_display[resource] = string shown to player
var resource_display = {'effort': "Effort", 'money': "Money", 'calculations': "Calculations",
    'code': "Code",'tflops':"TFLOPS"} 
    
var reward_list = ['effort','money','calculations','code','tflops','max_effort','max_calculations',
'max_code','effort_per_second','money_per_second','calculations_per_second','code_per_second','grade',
'reading_level','math_level','cs_level','art_level','physics_level','engineering_level'];
var reward_display = {'effort': "Effort", 'money': "$", 'calculations':"Calculations", 'code':"Code", 
'tflops':"TFLOPS", 'max_effort': "Max Effort", 'max_calculations':"Max Calculations", 'max_code': "Max Code",
'effort_per_second': "Effort/s", 'money_per_second': "$/s", 'calculations_per_second': "Calculations/s", 
'code_per_second':"Code/s", 'grade':"Grade", 'reading_level': "Reading Skill", 'math_level':"Math Skill",
'cs_level':"CS skill", 'art_level':"Art Skill", 'physics_level': "Physics Skill", 
'engineering_level': "Engineering Skill"};

function get_display_text(player_var){
    if(reward_display[player_var]){
        return reward_display[player_var]; //really only needs this
    }else{
        return false;
    }
}

var player = {
    debug_player: false, //automatically turns on debug function (X speedup)
    version: '0.311', //leading 0 is necessary for string comparison 
    random_seed: 0, //semi permanent random number, maybe use later

    musters: 0,
    effort: 9,
    money: 0.00,
    calculations: 0.0,
    code: 0.0,
    tflops: 0.0,
    total_tflops: 0.0,
    materials: 0.0,
    max_effort: 100,
    max_calculations: 250,
    max_code: 128,
    next_math_level: 5,
    next_cs_level: 5, 
    
    calculations_multiplier: 1, //super bonuses
    code_multiplier: 1,
    max_code_multiplier: 1,
    max_calculations_multiplier: 1,
    
    effort_per_second: 0.00,
    money_per_second: 0.00,
    calculations_per_second: 0.0,
    code_per_second: 0.0,
    materials_per_second: 0.0,
    grade:0,
    school:0,

    reading_level: 0,
    math_level: 0,
    cs_level: 0,
    art_level: 0,
    physics_level: 0,
    engineering_level: 0,
    
    show_math_level: 0,
    show_next_math_level: 0, //NEW
    show_cs_level: 0,
    show_next_cs_level: 0, //NEW
    show_physics_level: 0, //currently unused
    show_engineering_level: 0, //currently unused
    show_effort: 1,
    show_money: 1,
    show_calculations: 0,
    show_code: 0,
    show_tflops: 0,
    show_materials: 0,
    
    super_project_started: 0, //new
    math_super_project_status: 0, //new
    cs_super_project_status: 0, //new
    
    vacations: 0,
    motivations: 0, //new
    notebooks: 1,
    chalkboards: 0, //new
    
    bought_answers: 0,
    times_tutored: 0,
    calculators: 0,
    graphing_calculators: 0,
    computers: 0,
    
    memories: 0,
    dev_tools: 0,
    developers: 0,
    
    in_contest: false,
    contest_strength: 0,
    contest_progress: 0,
    contest_winnings: 100, //rewards are 1st: 100%, 2nd: 50%, 3rd: 20%
    
    math_research_projects_count: 0.0,
    math_research_failures: 0.0, //worth a bit of math skill
    math_research_money: 0.0, //+ money/s
    math_research_calculation_bonus: 0.0, //calculations/s multiplier
    math_research_money_bonus: 0.0, //money/s multiplier
    math_research_code_bonus: 0.0, //code/s multiplier
    math_research_projects: {},
    
    cs_projects_count:0,
    cs_super_project_stage: 0, //+code/s multiplier of 1.1, (effort scales with .95, code with 1.05)
                                //gradual scale up of starting progress (at starting progress > cost game ends)
    cs_neural_net_projects: 0, //+code/s (eventually unlocks cs super project)
    cs_language_projects: 0, //reduces bug frequency/count
    cs_website_projects: 0, //haven't decided
    cs_math_solver_projects: 0, //+ calculations/s
    cs_game_projects: 0, //money/s
    //Active projects are completed and contributing, bugs can make them inactive
    cs_active_neural_nets: 0,
    cs_active_languages: 0,
    cs_active_websites: 0,
    cs_active_math_solvers: 0,
    cs_active_games: 0,
    cs_projects: {},
    //SUPER cs data
    //lots of new stuff
    cs_super_projects: {},
    servers: 0,
    bot_nets: 0,
    super_computers: 0,
    ai_node_design_progress: 0,
    ai_buddy_design_progress: 0,
    self_correcting_code_design_progress: 0,
    self_editing_code_design_progress: 0,
    analizer_design_progress: 0,
    cs_active_ai_nodes: 0,
    cs_ai_buddy_chosen: 0,
    cs_active_ai_buddy: 0,
    cs_active_self_editing_code: 0,
    cs_active_self_correcting_code: 0,
    cs_active_code_analyzer: 0,
    edit_limit: .20,
    donate_button_clicks: 0,
    
    seconds_played: 0,
    //permanent stats
    permanent_bonuses: {},
    bonuses: 0,
    cs_resets: 0,
    math_resets: 0,
    all_seconds_played: 0 //New
};

//Greetings code delver
//If you want to know the status of various buttons, most of it is the ButtonData.js file,
// otherwise it will be in here somewhere


var player_reset_copy = {};
for(var key in player){ //copy all the default values immediately, use these values during a reset
    player_reset_copy[key] = player[key];
    player_reset_copy.math_research_projects = {};
    player_reset_copy.cs_projects = {};
}

var contest_time = 300 //default value, set randomly after first time out

//button order is as it appears on page
//Buttons become available in reverse order
//Top table:
var effort_box = document.getElementById('effort_box');
var money_box = document.getElementById('money_box');
var calculations_box = document.getElementById('calculations_box');
var code_box = document.getElementById('code_box');
var tflops_box = document.getElementById('tflops_box');
var math_skill_box = document.getElementById('math_skill_box');
var cs_skill_box = document.getElementById('cs_skill_box');

var effort_label_element = document.getElementById('effort_label');
var effort_count_element = document.getElementById('effort_count');
var money_label_element = document.getElementById('money_label');
var money_count_element = document.getElementById('money_count');
var calculations_label_element = document.getElementById('calculations_label');
var calculations_count_element = document.getElementById('calculations_count');
var code_label_element = document.getElementById('code_label');
var code_count_element = document.getElementById('code_count');
var tflops_label_element = document.getElementById('tflops_label');
var tflops_count_element = document.getElementById('tflops_count');
var math_label_element = document.getElementById('math_skill_label');
var math_count_element = document.getElementById('math_skill_count');
var cs_label_element = document.getElementById('cs_skill_label');
var cs_count_element = document.getElementById('cs_skill_count');
var muster_button = document.getElementById('muster');
var tab_bar = document.getElementById('tab_bar');
//tab buttons
var main_tab_button = document.getElementById('main_tab_button');
var math_tab_button = document.getElementById('math_tab_button');
var cs_tab_button = document.getElementById('cs_tab_button');
var special_tab_button = document.getElementById('special_tab_button');
var bonus_tab_button = document.getElementById('bonus_tab_button');
//The categories
var main_section = document.getElementById('main_section');
var math_section = document.getElementById('math_section');
var cs_section = document.getElementById('cs_section');
var special_section = document.getElementById('special_section');
var bonus_section = document.getElementById('bonus_section');

var tab_associations = {'main':main_tab_button, 'math':math_tab_button, 'cs':cs_tab_button, 
'special':special_tab_button, 'bonus':bonus_tab_button}
var section_associations = {'main':main_section, 'math':math_section, 'cs':cs_section, 
'special':special_section, 'bonus':bonus_section}

//main classes
var learn_logic_button = document.getElementById('learn_logic');
var learn_art_button = document.getElementById('learn_art');
var learn_math_button = document.getElementById('learn_math');
var learn_reading_button = document.getElementById('learn_reading');
learn_reading_button.innerHTML = textify('Learn to read');
//main grades/schools
//graduated:6
var school_up_5_button = document.getElementById('school_up_5');
var grade_up_4_button = document.getElementById('grade_up_4');
//grad school:5
var school_up_4_button = document.getElementById('school_up_4');
var grade_up_3_button = document.getElementById('grade_up_3'); 
//college:4
var school_up_3_button = document.getElementById('school_up_3');
var grade_up_2_button = document.getElementById('grade_up_2');
//high school:3
var school_up_2_button = document.getElementById('school_up_2');
var grade_up_1_button = document.getElementById('grade_up_1');
//middle school:2
var school_up_1_button = document.getElementById('school_up_1');
var grade_up_0_button = document.getElementById('grade_up_0');
//elementary school:1
var school_up_0_button = document.getElementById('school_up_0');
school_up_0_button.innerHTML = textify('Start School');
var buy_vacation_button = document.getElementById('buy_vacation');
var buy_motivation_button = document.getElementById('buy_motivation');
    //MATH section buttons
//math classes buttons
var learn_representation_theory_button = document.getElementById('learn_representation_theory');
var learn_topology_button = document.getElementById('learn_topology');
var learn_complex_analysis_button = document.getElementById('learn_complex_analysis');
var learn_linear_algebra_button = document.getElementById('learn_linear_algebra');
var learn_number_theory_button = document.getElementById('learn_number_theory');
var learn_advanced_calculus_button = document.getElementById('learn_advanced_calculus');
var learn_calculus_button = document.getElementById('learn_calculus');
var learn_trigonometry_button = document.getElementById('learn_trigonometry');
var learn_algebra_2_button = document.getElementById('learn_algebra_2');
var learn_algebra_button = document.getElementById('learn_algebra');
var learn_geometry_button = document.getElementById('learn_geometry');
var learn_prealgebra_button = document.getElementById('learn_prealgebra');
var learn_decimals_button = document.getElementById('learn_decimals');
var learn_arithmetic_button = document.getElementById('learn_arithmetic');
//math shop
var buy_chalkboard_button = document.getElementById('buy_chalkboard');
var buy_notebook_button = document.getElementById('buy_notebook');
var buy_computer_math_button = document.getElementById('buy_computer_math');
var buy_graphing_calculator_button = document.getElementById('buy_graphing_calculator');
var buy_calculator_button = document.getElementById('buy_calculator');
var buy_answers_button = document.getElementById('buy_answers');
var math_ongoing_section = document.getElementById('math_ongoing');
//do math things
var start_math_super_project_button = document.getElementById('start_math_super_project');
var start_math_research_button = document.getElementById('start_math_research');
var start_math_contest_button = document.getElementById('start_math_contest');
var do_math_contest_button = document.getElementById('do_math_contest');
var do_tutoring_button = document.getElementById('do_tutoring');
var do_calculation_button = document.getElementById('do_calculation');
    //CS section buttons

//cs classes buttons
var learn_haskell_button =  document.getElementById('learn_haskell');
var learn_assembly_button = document.getElementById('learn_assembly');
var learn_javascript_button = document.getElementById('learn_javascript');
var learn_algorithms_button = document.getElementById('learn_algorithms');
var learn_cplusplus_button = document.getElementById('learn_cplusplus');
var learn_c_button = document.getElementById('learn_c');
var learn_html_button = document.getElementById('learn_html');
var learn_python_button = document.getElementById('learn_python');
var learn_logo_button = document.getElementById('learn_logo');
//CS shop
var buy_memory_button = document.getElementById('buy_memory');
var buy_developer_button = document.getElementById('buy_developer');
var buy_dev_tools_button = document.getElementById('buy_dev_tools');
var buy_computer_cs_button = document.getElementById('buy_computer_cs');
//CS projects
var start_cs_super_project_button = document.getElementById('start_cs_super_project');
var create_neural_net_button = document.getElementById('create_neural_net');
var create_language_button = document.getElementById('create_language');
var create_website_button = document.getElementById('create_website');
var create_math_solver_button = document.getElementById('create_math_solver');
var create_game_button = document.getElementById('create_game');
var write_code_button = document.getElementById('write_code');
var cs_ongoing_section = document.getElementById('cs_ongoing');
var net_projects = document.getElementById('net_projects');
var language_projects = document.getElementById('language_projects');
var website_projects = document.getElementById('website_projects');
var solver_projects = document.getElementById('solver_projects');
var game_projects = document.getElementById('game_projects');
    //Special section
var cs_super_section = document.getElementById('cs_special_section');
var enter_matrix_button = document.getElementById('enter_matrix');
var ai_buddy_calculations_button = document.getElementById('ai_buddy_calculations');
var ai_buddy_code_button = document.getElementById('ai_buddy_code');
var buy_super_computer_button = document.getElementById('buy_super_computer');
var buy_bot_net_button = document.getElementById('buy_bot_net');
var buy_server_button = document.getElementById('buy_server');
//cs special projects
var ai_node_button = document.getElementById('ai_node');
var design_ai_node_button = document.getElementById('design_ai_node');
var ai_buddy_button = document.getElementById('ai_buddy');
var design_ai_buddy_button = document.getElementById('design_ai_buddy');
var self_editing_code_button = document.getElementById('self_editing_code');
var design_self_editing_code_button = document.getElementById('design_self_editing_code');
var self_correcting_code_button = document.getElementById('self_correcting_code');
var design_self_correcting_code_button = document.getElementById('design_self_correcting_code');
var code_analizer_button = document.getElementById('code_analizer');
var design_code_analizer_button = document.getElementById('design_code_analizer');

//Footer section
var save_game_button = document.getElementById('save_game');
var reset_game_button = document.getElementById('reset_game');
var export_game_button = document.getElementById('export_game');
var import_game_button = document.getElementById('import_game');
var autosaving = document.getElementById('autosaving');

var timer = document.getElementById('timer');

var donate_button = document.getElementById('donate_button');

var export_popup = document.getElementById('export_popup');
var donate_popup = document.getElementById('donate_popup');

var visible_list = [
    effort_box,
    money_box,
    calculations_box,
    code_box,
    tflops_box,
    math_skill_box,
    cs_skill_box,

    muster_button,

    tab_bar,
    
    main_tab_button, //Main
    
    learn_logic_button,
    learn_art_button,
    learn_reading_button,
    learn_math_button,
    
    school_up_5_button,
    grade_up_4_button,
    school_up_4_button,
    grade_up_3_button,
    school_up_3_button,
    grade_up_2_button,
    school_up_2_button,
    grade_up_1_button,
    school_up_1_button,
    grade_up_0_button,
    school_up_0_button,
    
    buy_vacation_button,
    buy_motivation_button,
    
    math_tab_button, //Math
    learn_representation_theory_button,
    learn_topology_button,
    learn_complex_analysis_button,
    learn_linear_algebra_button,
    learn_number_theory_button,
    learn_advanced_calculus_button,
    learn_calculus_button,
    learn_trigonometry_button,
    learn_algebra_2_button,
    learn_algebra_button,
    learn_geometry_button,
    learn_prealgebra_button,
    learn_decimals_button,
    learn_arithmetic_button,
    
    start_math_super_project_button,
    start_math_research_button,
    start_math_contest_button,
    do_math_contest_button,
    do_tutoring_button,
    do_calculation_button,
    
    buy_chalkboard_button,
    buy_notebook_button,
    buy_computer_math_button,
    buy_graphing_calculator_button,
    buy_calculator_button,
    buy_answers_button,
    
    cs_tab_button, //CS
    learn_haskell_button,
    learn_assembly_button,
    learn_javascript_button,
    learn_algorithms_button,
    learn_cplusplus_button,
    learn_html_button,
    learn_c_button,
    learn_python_button,
    learn_logo_button,
    
    buy_developer_button,
    buy_dev_tools_button,
    buy_computer_cs_button,
    buy_memory_button,
    
    start_cs_super_project_button,
    create_neural_net_button,
    create_language_button,
    create_website_button,
    create_math_solver_button,
    create_game_button,
    write_code_button,
    
    special_tab_button,
    
    cs_super_section,
    enter_matrix_button,
    ai_buddy_code_button,
    ai_buddy_calculations_button,
    buy_super_computer_button,
    buy_bot_net_button,
    buy_server_button,
    
    ai_node_button,
    design_ai_node_button,
    ai_buddy_button,
    design_ai_buddy_button,
    self_editing_code_button,
    design_self_editing_code_button,
    self_correcting_code_button,
    design_self_correcting_code_button,
    code_analizer_button,
    design_code_analizer_button,
    
    bonus_tab_button,   
    
    save_game_button,
    reset_game_button,
    export_game_button,
    import_game_button,
    donate_button
];

var tab_bar = document.getElementById('tab_bar');

var popup = document.getElementById('popup');
var popup_special_text = document.getElementById('popup_special_text');
var popup_cost = document.getElementById('popup_cost');
var popup_reward = document.getElementById('popup_reward');
var popup_flavor = document.getElementById('flavor_text');

// functions yay!

function save_game(){
    localStorage['scholar_clicker_save'] = btoa(JSON.stringify(player));
}

function load_save(players_save){
    var current_version = player_reset_copy.version; //version before loading save
    //if(localStorage['scholar_clicker_save']){
     //   player = JSON.parse(atob(localStorage['scholar_clicker_save']));
    //}
    player = players_save;
    if(player.version != current_version){
        if(player.version < '0.311'){ //leading 0 is necessary for string comparison 
            player.money_per_second *= 2;
            player.effort_per_second *= 2;
            player.code_per_second *= 2;
            player.calculations_per_second *=2;
            add_note("Game now double speed!")
        }
        add_note("Updated game to version " + current_version);
        
        //check player variables against reset player variables to see if any are missing
        //If they are then update them to reset values and notify player that there may be errors
        var variable_warning = false;
        for(var key in player_reset_copy){
            if(player[key] == null){ //new variable added this version
                variable_warning = true;
                player[key] = player_reset_copy[key];
            }
        }
        if(variable_warning && player.version < '0.303'){ //will attempt to save 
            add_note("Some new features may not work with old save version");
            add_note("WARNING: You may need to reset");
        }
        player.version = current_version;
    }
    if(player.debug_player){debug = true};
}

if(localStorage['scholar_clicker_save']){
    var players_save = JSON.parse(atob(localStorage['scholar_clicker_save']));
    load_save(players_save);
}

function add_note(note_text){
    var note = document.createElement('div');
    note.className = 'note';
	note.style = 'text-align: right';
    note.innerHTML = textify("" + note_text); //force text to be string
    insert_start(note,notification_box);
    note_list.push(note);
    note_text_list.push(note_text);
    
    if(note_text_list.length > 20){
        //get rid of old notes
        notification_box.removeChild(note_list[0]);
        note_list.shift();
        note_text_list.shift();
    }
}

function capitalize(text){
     return text.charAt(0).toUpperCase() + text.slice(1);
}

//round_to(51.1,0) gives 51 
function round_to(num, digits){
    var digger = Math.pow(10,digits);
    return (Math.floor(num*digger)/digger);
}

//nice_round(2513.2, 2) gives 2500, rounds to n significant digits
function nice_round(num, digits){
    if(num == 0){ return 0;}
    //add_note(num + " " + digits);
    var num_digits = 1+Math.floor(Math.log(num) / Math.log(10) + .000001);
    var digger = Math.pow(10,num_digits - digits);
    return round_to((Math.floor(num /digger) * digger),digits); //also round to clean up rounding errors
}

function rand_from_list(list_array){
    return list_array[Math.floor(Math.random()*list_array.length)];
}

function number_to_text(num){
    if(player.math_level < 5){
        if(num >= 100){
            return 'Tons';
        }else if(num >= 15){
            return 'Lots';
        }else if(num >= 8){
            return 'Bunch';
        }else if(num >= 4){
            return 'Some';
        }else if(num >= 2){
            return 'Bit';
        }else if(num > 0){
            return 'Little';
        }else{ // num == 0
            return 'None';
        }
    }else{
        if(num >= infinity){
            return "Infinity";
        }else if(num >= 1000000000000000){
            return round_to(num/1000000000000000.0,2) + "Q";
        }else if(num >= 1000000000000){
            return round_to(num/1000000000000.0,2) + "T";
        }else if(num >= 1000000000){
            return round_to(num/1000000000.0,2) + "B"; //I don't think anything in the game gets this big
        }else if(num >= 1000000){
            return round_to(num/1000000.0,2) + "M";
        }else if(num >= 10000){
            return round_to(num/1000.0,1) + "K";
        }
        return num;
    }
}

function disable(button){
    button.is_disabled = true;
    button.style.color = 'grey'; //grey text means disabled
}

function enable(button){
    button.is_disabled = false;
    button.style.color = 'black'; //black text means enabled
}

color_list = ['red', 'yellow', 'green', 'grey_green', 'black'];
function clear_colors(button){
    for(var i = 0; i<color_list.length; i++){
        button.classList.remove(color_list[i]);
    }
}

function set_color(button, color){
    clear_colors(button); //get rid of any other colors first
    if(player.art_level >= 10){
        button.classList.add(color);
    }
}

function next_level(skill_name){
    var very_large = 9000000000; //numbers seem to get messed up over 9.999 bil
    var best_next = very_large;
    for(var i = 0; i < visible_list.length; i++){
        var cur_button = visible_list[i];
        if(cur_button.requirements && cur_button.requirements[skill_name]){
            var others_met = true;
            for(var key in cur_button.requirements){
                if(key != skill_name && cur_button.requirements[key] > player[key]){
                    others_met = false;
                }
            }
            if(others_met && cur_button.requirements[skill_name] > player[skill_name]){
                best_next = Math.min(best_next, cur_button.requirements[skill_name]);
            }
        }
        if(skill_name == 'math_level' && cur_button.grade_disable){
            for(var key in cur_button.grade_disable){
                if(cur_button.grade_disable[key] > player[skill_name]){ //skill name== math_level
                    best_next = Math.min(best_next, cur_button.grade_disable[key]);
                }
            }
        }
    }
    if(best_next >= very_large){
        return false;
    }
    return best_next;
}

function update_counts() { //this function updates the number of clicks displayed
    if(player.musters >= 4){
        player.musters -= 4;
        player.effort += 1 + player.motivations;
    }
    muster_button.innerHTML = textify("Muster " + player.musters + "/4");
    muster_button.reward = {musters: 1, text: "4 musters = " + (1 + player.motivations) +" Effort"};

    player.effort = Math.min(player.effort, player.max_effort);
    player.calculations = Math.min(player.calculations, player.max_calculations * player.max_calculations_multiplier);
    player.code = Math.min(player.code, player.max_code * player.max_code_multiplier);
    if(player.calculations >= player.max_calculations * player.max_calculations_multiplier){
        disable(do_calculation_button);
    }else{
        enable(do_calculation_button);
    }
    if(player.code >= player.max_code * player.max_code_multiplier){
        disable(write_code_button);
    }else{
        enable(write_code_button);
    }
    var show_rate = false;
    if(player.math_level >= 40){
        show_rate = true;
    }
    
    effort_label_element.innerHTML = textify("Effort");
    var shown_effort = number_to_text(Math.floor(player.effort));
    shown_effort += "/" + number_to_text(player.max_effort);
    if(show_rate){
        shown_effort += " (" + round_to(player.effort_per_second,2) + "/s)";
    }
    effort_count_element.innerHTML = textify(shown_effort);
    
    money_label_element.innerHTML = textify('Money');
    
    var shown_money = number_to_text(round_to(player.money,2));
    var money_rate = player.cs_active_games * 1.0 + player.money_per_second;
    money_rate = money_rate * Math.pow(cs_money_multiplier, player.cs_active_websites);
    money_rate = money_rate * Math.pow(math_money_multiplier, player.math_research_money_bonus);
    if(show_rate && money_rate > 0){
        shown_money = shown_money + " (" + round_to(money_rate,2) + "/s)";
    }
    money_count_element.innerHTML = textify(shown_money);
    
    //TODO: make it so grade ups are counted by this thing
    //TODO: grade up.[something] = [req0,req1,req2,req3]
    var shown_math_skill = number_to_text(player.math_level);
    if(player.show_next_math_level>0){
        if(player.next_math_level <= player.math_level){
            var new_math_level = next_level('math_level');
            player.next_math_level = new_math_level;
        }
        if(player.next_math_level){ //false if everything is unlocked
            shown_math_skill += "/" + number_to_text(player.next_math_level);
        }
    }
    math_count_element.innerHTML = textify(shown_math_skill);
    
    var shown_cs_skill = number_to_text(player.cs_level);
    if(player.show_next_cs_level>0){
        if(player.next_cs_level <= player.cs_level){
            var new_cs_level = next_level('cs_level');
            player.next_cs_level = new_cs_level;
        }
        if(player.next_cs_level){ //false if everything is unlocked
            shown_cs_skill += "/" + number_to_text(player.next_cs_level);
        }
    }
    cs_count_element.innerHTML = textify(shown_cs_skill);
    
    var shown_calculations = number_to_text(nice_round(round_to(player.calculations,0),3));
    shown_calculations += "/" + number_to_text(player.max_calculations * player.max_calculations_multiplier);
    if(show_rate && player.calculations_per_second > 0){
        var calc_rate = player.calculations_per_second*Math.pow(math_calc_multiplier, player.math_research_calculation_bonus);
        calc_rate *= Math.pow(cs_calc_multiplier, player.cs_active_math_solvers);
        calc_rate *= player.calculations_multiplier;
        calc_rate = round_to(calc_rate,2);
        if(calc_rate >= 10){
            calc_rate = nice_round(round_to(calc_rate,1),3);
        }
        shown_calculations += " (" + calc_rate + "/s)";
    }
    calculations_count_element.innerHTML = textify(shown_calculations);
    
    shown_code = number_to_text(round_to(player.code,0));
    shown_code += "/" + number_to_text(player.max_code * player.max_code_multiplier);
    if(show_rate && player.code_per_second > 0){
        var code_rate = player.code_per_second * Math.pow(math_code_multiplier,player.math_research_code_bonus); 
        code_rate *= Math.pow(cs_code_multiplier, player.cs_active_neural_nets);
        code_rate *= player.code_multiplier;
        shown_code += " (" + round_to(code_rate,2) + "/s)";
    }
    code_count_element.innerHTML = textify(shown_code);
    
    var shown_tflops = number_to_text(round_to(player.tflops,0));
    shown_tflops += "/" + number_to_text(player.total_tflops);
    tflops_count_element.innerHTML = textify(shown_tflops);
    
    if(start_math_contest_button.is_disabled == false){
        start_math_contest_button.innerHTML = contest_time + " Math Contest";
    }else{
        start_math_contest_button.innerHTML = "Math Contest";
    }
    if(debug){//TODO: eventually move this to some stats screen (make true time count, not fake time count)
        var seconds = player.seconds_played%60;
        var minutes = (round_to(player.seconds_played/60, 0))%60;
        var hours = (round_to(player.seconds_played/3600, 0));
        timer_text = "" + seconds
        if(seconds <10){
            timer_text = "0" + timer_text;
        }
        timer_text = minutes + ":" + timer_text;
        if(minutes <10){
            timer_text = "0" + timer_text;
        }
        timer_text = "  " + hours + ":" + timer_text;
        timer.innerHTML = timer_text;
    }else{
        timer.innerHTML = "";
    }
}

function set_button_size(button, x_size, y_size){
    button.style.width = x_size + 'px';
    button.style.height = y_size + 'px';
}

function grow_button(button, x_size, y_size){
    var steps = 20.0;
    var n = 1.0
    var id = setInterval(function(){
        var step_x_size = x_size * n/steps;
        var step_y_size = y_size * n/steps;
        set_button_size(button, step_x_size, step_y_size);
        n++;
    }, 300.0 * n/steps)
    setTimeout(function(){
        set_button_size(button, x_size, y_size);
        clearInterval(id);
    }, 300.0 )
}

function button_appears(button){
    popup.style.display = 'none'; //hide the popup if we add a new button
    if(button.nodeName == 'BUTTON'){ //if its a button animate its appearance
        if(button.className == 'tab_button'){ //TODO: don't comapare, check (fails on multiple classes)
            grow_button(button, 65.0, 23.0); //Must match css size
        }else if(button.className == 'foot_button'){ //currently same size as tab button
            grow_button(button, 56.0, 23.0); //Must match css size
        }else if(button.className == 'large_button'){
            grow_button(button, button_width, 46.0); //Must match css size
        }else{
            grow_button(button, button_width, 23.0);
        }
    }
    var parent_node = button.parentNode;
    var done = false;
    while(parent_node != null && !done){ //highlight section that the button appeared in
        for(var key in section_associations){
            if(parent_node == section_associations[key]){
                var tab_button = tab_associations[key];
                if(tab_button.is_disabled == false){
                    if(player.art_level >= 10){
                        set_color(tab_button, 'grey_green');
                    }else{
                        tab_button.innerHTML = "*" + tab_button.inner_text + "*";
                    }
                }
                done = true;
                break;
            }
        }
        parent_node = parent_node.parentNode;
    }
}

function update_screen(){
    //MAYBE DO: make a list of key values where something changes and only update when one is passed
    for(var i = 0; i < visible_list.length; i++){
        var cur_button = visible_list[i];
        //check if the current button should be visible now
        if(cur_button.requirements){
            var meets_requirements = true;
            for (var key in cur_button.requirements){
                //check each requirement against the players level in that requirement
                if(cur_button.requirements[key] > player[key]){ 
                    meets_requirements = false;
                    break;
                }
            }
            if(meets_requirements){
                if(cur_button.style.display == 'none'){ // new button appears
                    button_appears(cur_button);
                }
                cur_button.style.display = 'inline';
                if(cur_button.nodeName == 'TD'){
                    cur_button.style.display = ''; //weird bug where inline messes up TD style
                }
            }else{
                cur_button.style.display = 'none';
            }
        }
        //check if the current button should be disabled now
        if(cur_button.disable){
            var should_disable = true;
            for (var key in cur_button.disable){
                //check each requirement against the players level in that requirement
                if(player[key] < cur_button.disable[key]){ 
                    should_disable = false;
                    break;
                }
            }
            if(should_disable){
                if(! cur_button.is_disabled){
                    popup.style.display = 'none'; //hide popup when disabling a button
                    disable(cur_button);
                }
            }else{
                enable(cur_button);
            }
        }
        if(cur_button.inner_text && cur_item.className != 'tab_button'){
            if(cur_button.text_counter){
                if(player[cur_button.text_counter] > 0){
                    cur_button.innerHTML = "("+ player[cur_button.text_counter] + ") " + cur_button.inner_text;
                }else{
                    cur_button.innerHTML = cur_button.inner_text;
                }
            }
        }
        
        if(cur_button.grade_disable){
            var enable_button = false;
            for(var key in cur_button.grade_disable){
                if(player.grade == key){ //== for string to number comparison
                    if(player.math_level >= cur_button.grade_disable[key]){
                        enable_button = true;
                    }
                }
            }
            if(enable_button){
                if(cur_button.is_disabled == true){
                    button_appears(cur_button); //newly appearing button so make it appear
                }
                enable(cur_button);
            }else{
                disable(cur_button);
            }
        }
    }
    //Custom button behaviour (normal conditions aren't satisfactory)
    if(player.bought_answers > 0){
        learn_algebra_button.style.display = 'inline'; //cheating allows this
    }
    if(player.bought_answers > 1){
        learn_algebra_2_button.style.display = 'inline'; //cheating allows this
    }
    buy_memory_button.reward = {max_code: player.max_code, memories: 1};
}

//scramble characters of text if you dont know how to read yet
function textify(some_text){
    if(player.reading_level <= 4){
        var char_array = some_text.split('');
        for(var i = 0; i< char_array.length; i++){
            var char_code = char_array[i].charCodeAt(0);
            if((char_code+2)%6 >= player.reading_level && char_code != 32){
                char_array[i] = String.fromCharCode(char_code+64*(5-player.reading_level));
            }
        }
        //char_array.join()
        return char_array.join('');
    }else{
        return some_text;
    }
}

function insert_start(element, parent){
    var first_child = parent.firstChild;
    if(first_child === null){
        parent.appendChild(element);
    }else{
        parent.insertBefore(element, first_child);
    }
}

function insert_after(element, target){
    var parent = target.parentNode;
    var next_sibling = target.nextSibling;
    if (next_sibling === null){
        parent.appendChild(element);
    }else{
        parent.insertBefore(element, next_sibling);
    }   
}

var animation_limit = 7;
var current_animation = 0;
var text_animation_elements = [];
var text_animations = [];
var x_offsets = [-1,-2,-3,-3,-2,-1,1,2,3,3,2,1]; //guesstimated smoothish curve
var offset_count = 12;

function do_click_animation(element, anim_number, mouse_x, mouse_y){
    var n = 1;
    var randomer = Math.floor(offset_count*Math.random()); //random start in curve
    var randomer_x = 20-Math.floor(40*Math.random()); //random start in curve
    var duration = 1000.0;
    var steps = duration*30/1000.0 //30 fps
    var id = setInterval(function(){
        element.style.top = (mouse_y-2*n-15) + 'px';
        element.style.left = (mouse_x-5 - x_offsets[(n+randomer)%offset_count] + randomer_x) + 'px';
        element.style.display = '';
        element.style.opacity = 1-1.0*n/steps;
        n++;
    }, duration/steps)
    text_animations[anim_number] = id;
    setTimeout(function(){
        clearInterval(id);
        main_body.removeChild(element);
    }, duration )
}

function click_animate(animated_text){
    if(evt != null){ //must have moved the mouse at some point to get last position
        var main_body = document.getElementById('main_body')
        if(text_animations[current_animation]){ //hide animations over the 7th so screen doesnt overcrowd
            var elem = text_animation_elements[current_animation];
            elem.style.display = 'none';
        }
        
        var animated_element = document.createElement('div');
        animated_element.className = 'animation';
        animated_element.style.display = 'none';
        animated_element.style.position = 'absolute;';
        animated_element.innerHTML = animated_text;
        insert_start(animated_element,main_body);
        text_animation_elements[current_animation] = animated_element;
        
        var mouse_x = evt.pageX;
        var mouse_y = evt.pageY;
        do_click_animation(animated_element, current_animation, mouse_x, mouse_y);

        current_animation = (current_animation+1)%animation_limit; //cycle though objects
    }
}

var skill_list = ['reading_level','math_level','cs_level','art_level','physics_level','engineering_level'];
function animate_reward(button){
    for(var key in button.reward){
        var done = false;
        for(var skill_key in skill_list){
            var skill = skill_list[skill_key];
            if(skill == key){
                if(player['show_' + key] > 0){
                    click_animate("+" + get_display_text(key));
                }else{
                    click_animate("+Skill");
                }
                done = true;
            }
        }
        if(!done && (key=='grade' || key=='money')){
            click_animate("+" + get_display_text(key));
        }
        //if(!done && get_display_text(key)){
        //    click_animate("+" + get_display_text(key)); //most stuff not worth adding a click animation
        //}
    }
}

function attempt_purchase(button, no_notify) {
    if(button.is_disabled){
        return false;
    }
    if(button.requirements){
        if(button.requirements.math_level){
            if(button.requirements.math_level > player.math_level){
                if(!no_notify || player.show_math_level == 0){
                    add_note("Math Skill not high enough"); //only possible via buying answers
                    player.show_math_level = 1;
                    update_screen();
                }
                return false;
            }
        }
    }
    if(button.cost){
        var multiplier = 1;
        if(button.exponent){
            for(var key in button.exponent){ //Should have exactly one value key pair
                multiplier = Math.pow(button.exponent[key],player[key]);
            }
        }
        //each possible resource cost
        var cost_block = {effort: 0, calculations: 0, money: 0, code: 0, tflops: 0};
        for(var key in button.cost){ //costs are rounded to nearest
            var amount = round_to(button.cost[key] * multiplier, 0);
            if(key == 'money'){
                amount = round_to(button.cost[key] * multiplier, 2);
            }
            cost_block[key] = amount;
        }
        for(var key in cost_block){
            if(player[key] < cost_block[key]){
                if(!no_notify || !player['show_' + key]){
                    add_note("Not enough " + resource_display[key]);
                }
                if(!player['show_' + key]){
                    player['show_' + key] = 1;
                    update_screen();
                }
                return false;
            }
        }
        for(var key in cost_block){
            player[key] -= cost_block[key];
        }
    }
    return true;
}

function undo_purchase(button){ //used if the player says no to a popup thing, or whatever
    var multiplier = 1;
    if(button.exponent){
        for(var key in button.exponent){ //Should have exactly one value key pair
            multiplier = Math.pow(button.exponent[key],player[key]);
        }
    }
    if(button.cost){
        for(var key in button.cost){
            var amount = round_to(button.cost[key] * multiplier, 0);
            if(key == 'money'){
                amount = round_to(button.cost[key] * multiplier, 2);
            }
            player[key] += amount;
        }
    }
    if(button.reward){
        for(var key in button.reward){
            var amount = round_to(button.reward[key] * multiplier, 0);
            if(key == 'money'){
                amount = round_to(button.reward[key] * multiplier, 2);
            }
            player[key] -= amount;
        }
    }
}

//spend necessary stuff, get rewards, update screen
function do_button_clicked(button){
    if(!attempt_purchase(button)){
        return false;
    }
    if(button.reward){
        for (var key in button.reward){
            if(key != 'text'){
                player[key] += button.reward[key];
            }
        }
        animate_reward(button)
    }
    update_counts();
    update_screen();
    update_popup(button);
    return true;
}

var current_popup_button = null; 
//update the text displayed in the mouseover popup (works continuously)
function update_popup(button){
    current_popup_button = button; //remember what button the current popup is of
    var popup_text_0 = "";
    var popup_text_1 = "";
    var popup_text_2 = "";
    var popup_text_3 = "";
    if(button.special_text){
        popup_text_0 = button.special_text;
    }
    //don't show cost of disabled buttons with exponential cost (since cost goes up
    if(button.cost && (!button.is_disabled || !button.exponent)){
        multiplier = 1;
        previous = false;
        if(button.exponent){
            for(var key in button.exponent){ //Should have exactly one value key pair
                multiplier = Math.pow(button.exponent[key],player[key]);
            }
        }
        popup_text_1 += "- ";
        for(var i = 0; i < resource_list.length; i++){
            var resource = resource_list[i];
            //add_note("resource_check:" + resource + ", " + player['show_' + resource]);
            if(button.cost[resource] && player['show_' + resource] > 0){
                //add_note("here we are");
                if(resource == 'money'){
                    popup_text_1 += "$" + number_to_text(round_to(button.cost[resource]*multiplier,2)) + ", ";
                }else{
                    popup_text_1 += number_to_text(round_to(button.cost[resource]  * multiplier, 0));
                    popup_text_1 += " " + textify(resource_display[resource]) + ", ";
                }
            }
        }
        
        if(popup_text_1.length >= 2){ //chop off last 2 characters: ', '
            popup_text_1 = popup_text_1.slice(0, -2); 
        }
    }
    //TODO: make -,,,,  +,+,+, consistent between cost and reward
    //MAYBE DO: simplify this section like the one above (lots of unique functionality though)
    if(button.reward){
        if(button.reward.math_level){
            if(player.show_math_level > 0){
                popup_text_2 += "+ " + number_to_text(button.reward.math_level) + " Math Skill, ";
            }else{
                popup_text_2 += "+ Skill, ";
            }
        }
        if(button.reward.cs_level){
            if(player.show_cs_level > 0){
                popup_text_2 += "+ " + button.reward.cs_level + " CS Skill, ";
            }else{
                popup_text_2 += "+ Skill, ";
            }
        }
        if(button.reward.money){
            popup_text_2 += "+ $" + number_to_text(round_to(button.reward.money,2)) + ", ";
        }
        if(button.reward.calculations){
            popup_text_2 += "+ " + round_to(button.reward.calculations,0) + " Calculation";
            if(round_to(button.reward.calculations,0) != 1){popup_text_2 += "s";}
            popup_text_2 += ", ";
        }
        if(button.reward.code){
            popup_text_2 += "+ " + button.reward.code + " Code, ";
        }
        if(button.reward.effort_per_second){
            if(player.math_level >= 5){
                popup_text_2 += "+ " + button.reward.effort_per_second + " Effort/s, ";
            }else{
                popup_text_2 += "+ Effort/s, ";
            }
        }
        if(button.reward.max_effort){
            popup_text_2 += "+ " + number_to_text(round_to(button.reward.max_effort,0)) + " Max Effort, ";
        }
        if(button.reward.calculations_per_second){
            popup_text_2 += "+ " + round_to(button.reward.calculations_per_second,2) + " Calculations/s, ";
        }
        if(button.reward.code_per_second && player.show_code){
            popup_text_2 += "+ " + round_to(button.reward.code_per_second,2) + " Code/s, ";
        }
        if(button.reward.max_calculations){
            popup_text_2 += "+ " + number_to_text(round_to(button.reward.max_calculations,0)) + " Max Calculations, ";
        }
        if(button.reward.max_code){
            popup_text_2 += "+ " + number_to_text(round_to(button.reward.max_code,0)) + " Max Code, ";
        }
        if(button.reward.tflops && player.show_tflops){
            popup_text_2 += "+ " + button.reward.tflops + " TFLOPS, ";
        }
        if(button.reward.text){ //special reward text added as well
            popup_text_2 += button.reward.text + ", ";
        }
        if(popup_text_2.length >= 2){ //chop off last 2 characters which are: ", "
            popup_text_2 = popup_text_2.slice(0, -2); 
        }
    }
    if(button.flavor && button.flavor != ""){
        popup_text_3 = button.flavor;
    }
    popup_special_text.innerHTML = textify(popup_text_0);
    popup_cost.innerHTML = textify(popup_text_1);
    popup_reward.innerHTML = textify(popup_text_2);
    popup_flavor.innerHTML = textify(popup_text_3);
    mouse_moved(evt); //reajust popup position based on new size;
}

var mouse_outs = 0;

function popup_display(check){
    if(mouse_outs == check){ //mouse must not have left button in intervening time
        popup.style.display = 'inline';
    }
}

function button_mouse_over(button){
    var check_val = mouse_outs;
    update_popup(button); 
    if(button.cost || button.reward || button.flavor){ //at least one popup item
        setTimeout(function()
        {
            popup_display(check_val); //don't show popup if player moved mouse elsewhere
        },450);
    }
}

function button_mouse_out(button){
    popup.style.display = 'none';
    mouse_outs += 1;
}

var evt = null //storing last mouse event

function mouse_moved(mouse_event){
    //TODO: figure out how to remove delay from popup repositioning
    if(mouse_event != null){
        evt = mouse_event; //store this so I can call function elsewhere
        if(evt.pageX+20 > window.innerWidth-popup.offsetWidth-25){
            popup.style.left = (evt.pageX - popup.offsetWidth - 10) + 'px';
        }else{
            popup.style.left = evt.pageX+20 + 'px';
        }
        if(evt.pageY+20 > window.innerHeight-popup.offsetHeight - 3){ //35 to acc
            popup.style.top = (evt.pageY - popup.offsetHeight - 10) + 'px';
        }else{
            popup.style.top = evt.pageY +20 + 'px';
        }
        //popup.style.left = Math.min((evt.pageX+20), window.innerWidth-popup.offsetWidth-3)  + 'px';
        //popup.style.top = Math.min((evt.pageY+20), window.innerHeight-popup.offsetHeight-35) + 'px';
    }
}

document.onmousemove = function follow(mouse_event){
    mouse_moved(mouse_event);
}

//Set up default behaviour for all buttons
//lots are overridden below for speciality buttons
function set_up_mouse_overs(button){
    button.onmouseover = function(){
        button_mouse_over(button);
    }
    button.onmouseout = function(){
        button_mouse_out(button);
    }
}

for(var i = 0; i < visible_list.length; i++){
    var cur_item = visible_list[i];
    if(cur_item.nodeName == 'BUTTON'){ //isa button
        cur_item.onclick = function() {
            do_button_clicked(this);
        }
        set_up_mouse_overs(cur_item);
        cur_item.onkeypress = function(){return false;} //holding down enter no longer autoclicks for you
    }
    if(cur_item.text_counter || cur_item.className == 'tab_button'){
        cur_item.inner_text = cur_item.innerHTML;
    }
}

function textify_update(){
    learn_reading_button.innerHTML = textify("Learn to read");
    school_up_0_button.innerHTML = textify("Start School");
    for(var i = 0; i< note_text_list.length; i++){
        var note = note_list[i];
        note.innerHTML = textify(note_text_list[i]);
    }
}

///////////////////////////Main buttons click section///////////////////////////////

muster_button.onclick = function(){
    if(!do_button_clicked(this)){
        return;
    }
    if(player.musters == 0){
        click_animate("+Effort");
    }
}

learn_art_button.onclick = function() {
    if(!do_button_clicked(this)){
        return;
    }
    if(player.art_level >= 10){
        add_note('Learned about colors');
        //update the various stuff that might need coloring
        update_cs_super_projects();
        update_cs_projects();
        update_screen();
        update_counts();
        update_math_projects();
        update_permanent_bonuses();
    }
}

learn_math_button.onclick = function() {
    if(!do_button_clicked(this)){
        return;
    }
    if(player.math_level >= 5){
        add_note('Learned to count');
    }
}

learn_reading_button.onclick = function() {
    if(!attempt_purchase(this)){ return; }
    player.reading_level++;
    if(player.reading_level == 5){
        add_note('Learned to read');
    }
    click_animate("+" + textify("Skill"));
    textify_update();
    update_screen();
    update_counts(); //updates the text
    update_popup(this);
};

var grade_up_buttons = [grade_up_4_button, grade_up_3_button, grade_up_2_button, grade_up_1_button, grade_up_0_button];

for(var i = 0; i < grade_up_buttons.length; i++){
    grade_up_button = grade_up_buttons[i];
    grade_up_button.onclick = function() {
        if(!do_button_clicked(this)){ return; }
        var note_text = 'Started Grade ' + player.grade;
        add_note(note_text);
    }
}
school_up_4_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    add_note('Started Grad School');
}
school_up_3_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    add_note('Started College');
}
school_up_2_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    add_note('Started High School');
}
school_up_1_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    add_note('Started Middle School');
    add_note('Autosave enabled');
    save_game();
}
school_up_0_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    add_note('Started School');
}

function close_section(section, button){
    section.style.display = 'none';
    enable(button);
    button.style.borderBottom = "2px solid #a1a1a1";
}
function open_section(section, button){
    disable(button);
    section.style.display = 'inline';
    button.style.borderBottom = "2px solid #dddddd";
    button.innerHTML = button.inner_text;
    clear_colors(button);
}

function open_menu(menu_name){
    for(var key in section_associations){
        close_section(section_associations[key], tab_associations[key]);
    }   
    for(var key in section_associations){
        if(menu_name == key){
            open_section(section_associations[key], tab_associations[key]);
            break;
        }
    }
}

main_tab_button.onclick = function() {open_menu('main')}
math_tab_button.onclick = function() {open_menu('math')}
cs_tab_button.onclick = function() {open_menu('cs')}
special_tab_button.onclick = function() {open_menu('special')}
bonus_tab_button.onclick = function() {open_menu('bonus')}


//math section buttons
//math classes functionality is done automatically

//math store buttons
buy_answers_button.onclick = function() {
    if(!attempt_purchase(this)){
        return;
    }
    player.bought_answers +=1;
    click_animate("-Ethics");
    if(player.math_level > 1250){ //Skips another class if we already have access to it
        player.bought_answers +=1;
    }
    update_screen();
    update_counts();
}


//Math projects are give a value level which is compared to various reward values. First one hit gives that reward
//and increases the value needed to get it again by some ratio.  
//ratios of 2.8, 2.6, 2.5, 1.8:  log vals: .447, .415, .398, .255
//log frequencies: 2.236, 2.410, 2.513, 3.917
//total frequency: 11.07 (things gotten per power of 10)
//Net result: 1.231 (perfectly matching exponent for starting a project = cost of projects matches value needed)
//current calculation net cost exponent: 1.213  (calc_exp * eff_exp^.4) (smaller so there is room for failures)
function math_project_clicked(button){
    if(!attempt_purchase(button)){
        return;
    }
    var project_id = button.id;
    var players_project = player.math_research_projects[project_id];
    if(! players_project){
        add_note("Error: missing "+ project_id + " from player data");
        return;
    }
    players_project.progress += 1;

    if(players_project.progress >= players_project.max_progress){
        players_project.value = player.math_level* Math.random();
        players_project.status = 'completed';

        if(players_project.value > 500000 * Math.pow(2.8,player.math_research_calculation_bonus)){
            var math_calc_bonus = round_to((math_calc_multiplier-1)*100,1)
            add_note("+" + math_calc_bonus + "% bonus to Calculations/s" );
            add_note("Discovered new computational method");
            add_note(players_project.name);
            //calculations/s multiplier
            player.math_research_calculation_bonus += 1;
            players_project.reward = {text: "+" + math_calc_bonus + "% Calculations/s"};
        }else if(players_project.value > 150000*Math.pow(2.6,player.math_research_money_bonus)){
            //money/s multiplier
            var math_money_bonus = round_to((math_money_multiplier-1)*100,1)
            add_note("+" + math_money_bonus +"% bonus to Money/s");
            add_note("Found money management technique");
            add_note(players_project.name);
            player.math_research_money_bonus += 1;
            players_project.reward = {text: "+" + math_money_bonus +"% Money/s"};
        }else if(players_project.value > 100000*Math.pow(2.5,player.math_research_code_bonus)){
            var math_code_bonus = round_to((math_code_multiplier-1)*100,1)
            add_note("+" + math_code_bonus +"% bonus to Code/s");
            add_note("Computational breakthrough"); 
            add_note(players_project.name);
            player.math_research_code_bonus += 1;
            players_project.reward = {text: "+" + math_code_bonus +"% Code/s"};
        }else if(players_project.value > 50000*Math.pow(1.8,player.math_research_money)){
            players_project.status = 'failed'; //don't show in completed projects
            var prize_val = 2500 + 2500 * player.math_research_money;
            add_note("Won prize worth $" + number_to_text(prize_val));
            add_note("Novel discovery");
            add_note(players_project.name);
            player.money += prize_val;
            player.math_research_money += 1;
            players_project.reward = {text: "+ $" + number_to_text(prize_val)};//this text is currently never visible
        }else{
            players_project.status = 'failed'; //don't show in completed projects
            var prize_val = 5000 * player.math_research_projects_count;
            add_note(players_project.name);
            add_note("Got " +  number_to_text(prize_val) + " Math Skill for the experience");
            add_note("Hit a dead end");
            player.math_level += prize_val;
            players_project.reward = {text: "+ " + number_to_text(prize_val) + " Math Skill"};//this text is currently never visible
        }  
    }
    update_math_projects();
    update_screen();
    update_counts();
    update_popup(button);
}

//function for scoping button var 
function set_up_project_functions(project_button){
    var button_copy = project_button;
    button_copy.onclick = function(){
        math_project_clicked(button_copy);
    }
    set_up_mouse_overs(button_copy);
}

function update_math_projects(){
    for(var i = 0; i < player.math_research_projects_count; i++){
        var project_id = 'math_project_' + i;
        var players_project = player.math_research_projects[project_id];
        var current_project_button = document.getElementById(project_id);
        if(current_project_button == null){
            current_project_button = document.createElement('button');
            container_div = document.createElement('div');
            insert_start(container_div, math_ongoing_section);
            insert_start(current_project_button, container_div);
            current_project_button.style.height = '46px';
            current_project_button.id = project_id;
            current_project_button.innerHTML = players_project.name;
            current_project_button.cost = {};
            current_project_button.cost.effort = players_project.cost_effort;
            current_project_button.cost.calculations = players_project.cost_calculations;
            grow_button(current_project_button, button_width, 46);
            set_up_project_functions(current_project_button);
        }
        current_project_button.reward = players_project.reward;
        if(players_project.status == 'started'){
            current_project_button.style.display = 'inline';
            enable(current_project_button);
            set_color(current_project_button, 'yellow');
        }else if(players_project.status == 'failed'){
            current_project_button.style.display = 'none';
            disable(current_project_button);
            set_color(current_project_button, 'grey_green');
        }else{ //completed
            current_project_button.style.display = 'inline';
            disable(current_project_button);
            set_color(current_project_button, 'grey_green');
        }
        var percent = 100.0*players_project.progress/ players_project.max_progress;
        current_project_button.special_text = round_to(percent,1) + "% complete";
    }
}

var math_pre_prefix_words = ["Pure", "Applied", "Abstract", "Complex"];
var math_prefix_words = [   "Algebraic", "Geometric", "Hyperbolic", "Trigonometric", 
                            "Elliptical", "Numeric", "Homological", "Linear",
                            "Vector", "Dynamical", "Probabilistic", "Computational",
                            "Differential", "Fractal", "Quantum"];
var math_midfix_words = [   "Algebra", "Geometry", "Curves", "Knot Theory", 
                            "Number Theory", "Topology", "Information Theory", 
                            "Game Theory", "Calculus", "Group Theory", "Tensor Theory",
                            "Combinatorics", "Statistics", "Manifolds"];
                       
start_math_research_button.onclick = function() {
    if(!attempt_purchase(this)){
        return;
    }
    
    var new_project_name = "";
    if(Math.random() < .25){
        var pre_prefix = math_pre_prefix_words[Math.floor(Math.random()*math_pre_prefix_words.length)];
        new_project_name = new_project_name + pre_prefix + " ";
    }
    var prefix = math_prefix_words[Math.floor(Math.random()*math_prefix_words.length)];
    new_project_name = new_project_name + prefix + " ";
    var midfix = math_midfix_words[Math.floor(Math.random()*math_midfix_words.length)];
    new_project_name = new_project_name + midfix;
    //MAYBE DO: give bonus attributes for having certain names
    
    var project_id = 'math_project_' + player.math_research_projects_count;
    var exponent_multiplier = Math.pow(1.12, player.math_research_projects_count);
    //calculation costs increase much faster since calculation makers are much easier to get
    var calculation_multiplier = Math.pow(1.16, player.math_research_projects_count); 
    
    player.math_research_projects[project_id] = {};
    players_project = player.math_research_projects[project_id];
    players_project.name = new_project_name;
    players_project.reward = {text: "+ ????"};
    players_project.progress = 0.0;
    players_project.max_progress = Math.floor(Math.pow(exponent_multiplier,.4)*20.0); //max progress increases slower
    players_project.cost_effort = Math.floor(exponent_multiplier*(20.0+40.0*Math.random()));
    players_project.cost_calculations = Math.floor(calculation_multiplier*(20+80*Math.random()));;
    players_project.value = 0;
    players_project.status = 'started';
    
    player.math_research_projects_count+=1;
    update_math_projects();
}

function math_contest_popup_text(){ 
    //rewards are 1st: 100%, 2nd: 50%, 3rd: 20%
    var reward_text = "1st: $";
    reward_text += number_to_text(nice_round(player.contest_winnings * 1.0, 2));
    reward_text += ", 2nd: $";
    reward_text += number_to_text(nice_round(player.contest_winnings * 0.5, 2));
    reward_text += ", 3rd: $";
    reward_text += number_to_text(nice_round(player.contest_winnings * 0.2, 2));
    do_math_contest_button.reward = {text: reward_text};
    if(player.contest_progress > 0){
        do_math_contest_button.special_text = player.contest_progress + "0% completed";
    }else{
        do_math_contest_button.special_text = "0% completed";
    }
    
    //also sets the button cost            e:contest_win*3.0   
    do_math_contest_button.cost = { calculations: Math.floor(player.contest_winnings *0.10),
                                    effort: Math.floor(player.contest_winnings *0.10)}
}

start_math_contest_button.onclick = function() {
    disable(start_math_contest_button);
    do_math_contest_button.style.display = 'inline';
    player.in_contest = true;
    math_contest_popup_text();
}

do_math_contest_button.onclick = function() {
    if(!attempt_purchase(this)){
        return;
    }
    player.contest_strength += player.math_level * Math.random() * Math.random() * 0.1; 
    player.contest_progress += 1;
    add_note(player.contest_progress + "0% completed"); //MAYBE DO: remove
    do_math_contest_button.special_text = player.contest_progress + "0% completed";
    update_popup(this); //update the popup's progress counter
    if(player.contest_progress >= 10){
        //player strength average of player.math_level/4
        var base_competitor_strength = player.contest_winnings * 100.0; //competitor strength = 
        var ranking = 1;
        for(var i = 0; i<9; i++){
            var competitor_strength = Math.random()* Math.random() * base_competitor_strength;
            if(competitor_strength > player.contest_strength){ //someone did better than you
                ranking+=1;
            }
        }
        //TODO make this a switch statement if possible
        switch(ranking){
        case 1:
            var first_prize = nice_round(player.contest_winnings * 1.0,2);
            player.money += first_prize;
            player.contest_winnings += first_prize * 0.8; //20% not counted bonus for easier next round 
            add_note("Got 1st place and won $" + number_to_text(first_prize));
            click_animate("+$");
            break;
        case 2:
            var second_prize = nice_round(player.contest_winnings * 0.5,2);
            player.money += second_prize;
            player.contest_winnings += second_prize;
            add_note("Got 2nd place and won $" + number_to_text(second_prize));
            click_animate("+$");
            break
        case 3:
            var third_prize = nice_round(player.contest_winnings * 0.2,2)
            player.money += third_prize;
            player.contest_winnings += third_prize;
            add_note("Got 3rd place and won $" + number_to_text(third_prize));
            click_animate("+$");
            break
        case 10:
            add_note("Got last place, no prize for you");
        default:
            add_note("Got "+ ranking + "th place, no prize"); //4th-9th
        }
        player.contest_progress = 0;
        player.contest_strength = 0;
        player.in_contest = false;
        do_math_contest_button.style.display = 'none';
        start_math_contest_button.style.display = 'none';
        enable(start_math_contest_button);
        reset_math_timer();
    }
    update_counts();
}

function reset_math_timer(){
    contest_time = 240* (1.0+ Math.random()); //random 4-8 minutes
}

function math_timer(){
    if(! player.in_contest){
        if(start_math_contest_button.style.display == 'none'){
            if(player.math_level > 9000 && player.grade >= 10){ //over nine thousand
                start_math_contest_button.style.display = 'inline'; //make button visible
                contest_time = 30; //but only for 30 seconds
            }else{
                start_math_contest_button.style.display = 'none';
                reset_math_timer(); //restart the wait 
            }
        }else{ //30 seconds ran out, hide again
            start_math_contest_button.style.display = 'none';
            reset_math_timer();
        }
    }
}

function cs_project_clicked(button, no_notify, ai_multiple){
    if(!attempt_purchase(button, no_notify)){
        return;
    }
    var project_id = button.id;
    var players_project = player.cs_projects[project_id];
    if(! players_project){ //for super projects
        players_project = player.cs_super_projects[project_id];
    }
    if(! players_project){
        add_note("Error: missing "+ project_id + " from player data");
        return;
    }
    //add_note("curent status " + players_project.status);
    if(players_project.status == 'started'){
        players_project.progress += 1;
        //add_note("progress made");
    }else if(players_project.status == 'bugged'){
        players_project.bug_count -= 1;
        if(!no_notify){
            click_animate("-Bug");
        }
    }

    if(players_project.progress >= players_project.max_progress && players_project.bug_count <= 0){
        var bug_special = Math.pow(cs_bug_multiplier, player.cs_active_languages);
        players_project.bug_count = Math.floor(Math.random() * players_project.max_bugs / bug_special);
        players_project.max_bugs = players_project.bug_count;
        if(players_project.bug_count > 0){
            if(players_project.bug_count == 1){
                add_note(players_project.bug_count + " bug appeared");
            }else{
                add_note(players_project.bug_count + " bugs appeared");
            }
            add_note(players_project.name);
            players_project.status = 'bugged';
        }else if(players_project.type == 'ai_node'){ //special case when ai node is debugged
            players_project.status = 'started';
            var ais_made = 1;
            if(ai_multiple && ai_multiple > 1){
                ais_made = ai_multiple; //make a node
            }
            pre_ais = player.cs_active_ai_nodes;
            if(player.cs_active_ai_nodes < infinity){ //bad stuff happens if it actually gets too big
                player.cs_active_ai_nodes += ais_made
            }
            players_project.max_progress = Math.floor(400*Math.pow(.9,player.cs_active_ai_nodes));
            players_project.max_progress = Math.max(2,players_project.max_progress); //must be at least one
            players_project.max_bugs = players_project.max_progress * 2;
            players_project.progress = 1;
            //58? 59? 60?  (stop notifying when multiples are created at once)
            if(ais_made < 2 || !no_notify){ //always notify on regular clicks
                add_note("AI Node created");
            }else if(ais_made >= 2 && player.cs_active_ai_nodes < infinity){
                add_note(number_to_text(ais_made) + " AI Nodes created");
            }
            if(player.cs_active_ai_nodes >= infinity && pre_ais < infinity){
                add_note("The AIs have taken over the world"); //happens once when infinity is hit
            }
        }else{
            if(players_project.type == 'self_correction_code' || player.cs_active_self_correcting_code > 0){
                add_note("Fully debugged");
            }else{
                add_note("Fully debugged for now");
            }
            add_note(players_project.name);
            players_project.status = 'active';
            player.show_cs_level = 1;  //bonus prize: now show your cs level for first project finished
            if(players_project.type != 'cs_game_projects'){
                player.show_next_cs_level = 1;
            }        
        }

        update_cs_projects();
        update_cs_super_projects();
    }else if(players_project.status == 'started'){
        //note removed, it was taking up too much note space, popup is sufficient instead
        //var percent = 100.0*(players_project.progress/ players_project.max_progress);
        //add_note(players_project.name + " " + round_to(percent,1) + "% complete");
        //update the popup's progress counter
    }
    update_screen();
    update_counts();
    update_cs_projects();
    update_cs_super_projects();
    //sometimes you mouseover something and autoclicker hits a different button bugfix
    if(current_popup_button == button || !no_notify){ 
        update_popup(button);
    }
}

function update_cs_project_stats(players_project, current_project_button){
    if(players_project.status == 'started'){ //in progress
        enable(current_project_button);
        set_color(current_project_button, 'yellow');
        current_project_button.innerHTML = players_project.name;
        var percent = 100.0*(players_project.progress/ players_project.max_progress);
        current_project_button.special_text = round_to(percent,1) + "% complete";
    }else if(players_project.status == 'bugged'){
        enable(current_project_button);
        current_project_button.innerHTML = players_project.name + "  bugs: " + players_project.bug_count;
        set_color(current_project_button, 'red');
        if(players_project.bug_count == 1){
            current_project_button.special_text = players_project.bug_count + " Bug";
        }else{
            current_project_button.special_text = players_project.bug_count + " Bugs";
        }
    }else if(players_project.status == 'active'){ //active project
        current_project_button.special_text = "Active";
        current_project_button.innerHTML = players_project.name;
        set_color(current_project_button, 'grey_green');
        disable(current_project_button);
    }else{
        add_note("ERROR: Bad cs project state");
    }
    //if(players_project.status == 'active'){
//
  //  }else{
   //     enable(current_project_button);
    //}
}

function check_cs_project(project_id){
    var current_project_button = document.getElementById(project_id);
    var players_project = player.cs_projects[project_id];
    if(current_project_button == null){
        current_project_button = document.createElement('button');
        container_div = document.createElement('div');
        insert_start(container_div, cs_ongoing_section);//TODO: switch to separate containers
        insert_start(current_project_button, container_div);
        current_project_button.id = project_id;
        current_project_button.style.height = '46px';
        current_project_button.innerHTML = players_project.name;
        current_project_button.cost = {};
        current_project_button.cost.effort = players_project.cost_effort;
        current_project_button.cost.code = players_project.cost_code;
        current_project_button.flavor = players_project.flavor;
        if(players_project.cost_calculations){
            current_project_button.cost.calculations = players_project.cost_calculations;
        }
        if(players_project.type == 'cs_game_projects'){
            current_project_button.reward = {text: "+ $1.00/s when active"};
            //insert_start(container_div, game_projects);
        }else if(players_project.type == 'cs_math_solver_projects'){
            current_project_button.reward = {text: "+ 10% Calculations/s when active"};
            //insert_start(container_div, solver_projects);
        }else if(players_project.type == 'cs_website_projects'){
            current_project_button.reward = {text: "+ 10% Money/s when active"};
            //insert_start(container_div, website_projects);
        }else if(players_project.type == 'cs_language_projects'){
            current_project_button.reward = {text: "+ 20% fewer bugs and less frequent bugs when active"};
            //insert_start(container_div, language_projects);
        }else if(players_project.type == 'cs_neural_net_projects'){
            current_project_button.reward = {text: "+ 10% Code/s when active"};
            //insert_start(container_div, net_projects);
        }else{ 
            add_note("ERROR: bad project type");
        }
        grow_button(current_project_button, button_width, 46);
        
        current_project_button.onclick = function(){
            cs_project_clicked(current_project_button);
        }
        set_up_mouse_overs(current_project_button);
    }
    update_cs_project_stats(players_project, current_project_button);
}

function update_cs_projects(){
    var active_dict = {'cs_game_projects':0, 'cs_math_solver_projects':0, 'cs_website_projects':0,
        'cs_language_projects': 0, 'cs_neural_net_projects':0}
    for(var i = 0; i < player.cs_projects_count; i++){
        var project_id = 'cs_project' + i;
        check_cs_project(project_id);
        var players_project = player.cs_projects[project_id];
        if(players_project.status == 'active'){
            active_dict[players_project.type] += 1;
        }
    }
    player.cs_active_games = active_dict['cs_game_projects'];
    player.cs_active_math_solvers = active_dict['cs_math_solver_projects'];
    player.cs_active_websites = active_dict['cs_website_projects'];
    player.cs_active_languages = active_dict['cs_language_projects'];
    player.cs_active_neural_nets = active_dict['cs_neural_net_projects'];
}

function update_cs_super_projects(){
    design_code_analizer_button.special_text = player.analizer_design_progress + "% complete";
    design_self_correcting_code_button.special_text = player.self_correcting_code_design_progress + "% complete";
    design_self_editing_code_button.special_text = player.self_editing_code_design_progress + "% complete";
    design_ai_buddy_button.special_text = player.ai_buddy_design_progress + "% complete";
    design_ai_node_button.special_text = player.ai_node_design_progress + "% complete";
    for(var key in player.cs_super_projects){
        var super_project = player.cs_super_projects[key];
        var super_project_button = document.getElementById(key);
        if(super_project_button){
            if(super_project.status == 'active'){
                if(super_project.type == 'code_analizer'){ //can be turned off by bugs appearing
                    player.cs_active_code_analyzer = 1; //TODO: analyzer or analizer?
                }
                if(super_project.type == 'self_correcting_code'){
                    player.cs_active_self_correcting_code = 1;
                }
                if(super_project.type == 'self_editing_code'){
                    player.cs_active_self_editing_code = 1;
                }
                if(super_project.type == 'ai_buddy'){
                    player.cs_active_ai_buddy = 1;
                }
            }
            update_cs_project_stats(super_project, super_project_button);
            if(super_project_button == ai_node_button && player.cs_active_ai_nodes > 0){
                var count_text = "(" + number_to_text(player.cs_active_ai_nodes) + ") ";
                super_project_button.innerHTML =  count_text + super_project_button.innerHTML;
                if(super_project.max_progress == 2 && super_project.status == 'started'){
                    super_project_button.special_text = "Growing";
                }
            }
        }else{
            add_note("missing super project button: " + key);
        }
    }
    player.edit_limit = Math.floor(20*Math.pow(.9,player.cs_active_ai_nodes))/100;
    self_editing_code_button.reward = {text: "Programs above " + Math.floor(20*Math.pow(.9,player.cs_active_ai_nodes)) +"% complete automatically continue progress"};
}

var game_flavors = ["Game of thrown errors", "Like Minecraft but worse!", "Collect them all!", 
    "ThingClicker", '"Five Stars" -My mom', "With dragons!", "In spaaaaace!", "At least 8 pixels",
    "Titanic attacks!", "Masterful racing"];
var website_flavors = ["Wahoo! Its a website!", "Ads, ads everywhere.", "Moogle It", " .xxx", 
    "As seen on reddit!", "With social networking!", "Show your friends!", "May contain cookies"];
var math_sovler_flavors = ["Only 4 colors needed", "Adds up multiple numbers at once", "Excels at calculations"];
var language_flavors = ["The speed of Python with the syntax of Fortran!", "Great for writing pseudo-code!", 
    "Lambdas, Lambdas everywhere", "With on the fly garbage optimization", "Always utilizes 100% of your CPU", 
    "Regularly expressive"]
var neural_net_flavors = ["Brainy", "Capable of beating a goldfish at checkers", "Highly recommended"];

function initialize_cs_project(players_project){
    players_project.progress = 0.0;
    players_project.value = 0;
    players_project.bug_count = 0;
    players_project.status = 'started';
}

function start_cs_project(project_type, button){
    var project_name = prompt("??????????????????(???????????????????????????)","");
    if(project_name == null || project_name == ""){
        undo_purchase(button);
        return false;
    }
    
    project_name = capitalize(project_name);
    
    var project_id = 'cs_project' + player.cs_projects_count; //type followed by count

    player.cs_projects[project_id] = {};
    players_project = player.cs_projects[project_id]; //initializing
    
    var difficulty_multiplier = 1.0;
    var calculation_cost_multiplier = 0;
    if(project_type == 'cs_game_projects'){ //no multiplier for cs_game
        players_project.flavor = rand_from_list(game_flavors);
    }else if(project_type == 'cs_math_solver_projects'){
        difficulty_multiplier = 2.0;
        calculation_cost_multiplier = 1.0; //this one also needs calculations
        players_project.flavor = rand_from_list(math_sovler_flavors);
    }else if(project_type == 'cs_website_projects'){
        difficulty_multiplier = 4.0;
        players_project.flavor = rand_from_list(website_flavors);
    }else if(project_type == 'cs_language_projects'){
        difficulty_multiplier = 10.0;
        players_project.flavor = rand_from_list(language_flavors);
    }else if(project_type == 'cs_neural_net_projects'){
        difficulty_multiplier = 25.0;
        calculation_cost_multiplier = 0.5;
        players_project.flavor = rand_from_list(neural_net_flavors);
    }
    
    var exponent_multiplier = difficulty_multiplier * Math.pow(1.75, player[project_type]);
    //effort gets a smaller multiplier since its harder to get
    var effort_multiplier = Math.pow(difficulty_multiplier, .80);
    //max progress is linear so it doesn't matter in the long run O(n)<O(e^n)
    var progress_multiplier = difficulty_multiplier * (1.0 + (player[project_type])/3.0);
    
    initialize_cs_project(players_project); //sets status, bug_count, progress, value
    players_project.name = project_name;
    players_project.type = project_type;
    players_project.max_progress = Math.floor(progress_multiplier*10.0);
    players_project.cost_effort = Math.floor(effort_multiplier*(12.0+25.0*Math.random()));
    players_project.cost_code = Math.floor(exponent_multiplier*(3+8*Math.random()));
    if(calculation_cost_multiplier > 0){
        players_project.cost_calculations = Math.floor(calculation_cost_multiplier * exponent_multiplier*(6+6*Math.random()));
    }
    
    players_project.max_bugs = players_project.max_progress;
    player[project_type] += 1;
    player.cs_projects_count += 1;
    update_cs_projects();
    update_screen();
    update_counts();
}

function update_permanent_bonuses(){
    player.bonuses = 0; 
    player.max_calculations_multiplier = 1;
    player.max_code_multiplier = 1;
    player.code_multiplier = 1;
    player.calculations_multiplier = 1;
    for(var bonus_name in player.permanent_bonuses){
        player.bonuses += 1;
        var bonus_object = player.permanent_bonuses[bonus_name];
        var bonus_button = document.getElementById(bonus_name);
        if(bonus_button == null){
            bonus_button = document.createElement('button');
            container_div = document.createElement('div');
            insert_start(container_div, bonus_section);
            insert_start(bonus_button, container_div);
            bonus_button.id = bonus_name;
            bonus_button.style.height = '46px';
            bonus_button.innerHTML = bonus_object.name;
            bonus_button.flavor = bonus_object.flavor;
            set_color(bonus_button, 'grey_green');
            disable(bonus_button);
        }
        if(bonus_object.type == 'ai_buddy_calculations'){
            player.max_calculations_multiplier *= 1.5;
            player.calculations_multiplier *= 1.25;
            bonus_button.reward = ai_buddy_calculations_button.reward
        }else if(bonus_object.type == 'ai_buddy_code'){
            player.max_code_multiplier *= 1.5;
            player.code_multiplier *= 1.25;
            bonus_button.reward = ai_buddy_code_button.reward
        }else{
            add_note("ERROR: perma bonus type not found")
        }
        set_up_mouse_overs(bonus_button);
    }
    update_screen();
    update_counts();
}

function make_permanent_bonus(bonus_type){
    var bonus_number = 1;
    var bonus_name = bonus_type + bonus_number;
    while(player.permanent_bonuses[bonus_name] != null){ //If it already exists add one and try again
        bonus_number += 1;
        bonus_name = bonus_type + bonus_number;
    }
    player.permanent_bonuses[bonus_name] = {}; //make object
    var bonus_object = player.permanent_bonuses[bonus_name]; //fetch 
    bonus_object.project_id = bonus_name;
    bonus_object.type = bonus_type; //set type
    return bonus_object;
}

ai_buddy_calculations_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    var ai_name = prompt("??????????????????(???????????????????????????)","");
    if(ai_name == null || ai_name == ""){
        undo_purchase(ai_buddy_calculations_button);
        update_screen();
        return false;
    }
    var bonus_object = make_permanent_bonus('ai_buddy_calculations');
    bonus_object.name = capitalize(ai_name);
    update_permanent_bonuses();
}

ai_buddy_code_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    var ai_name = prompt("??????????????????(???????????????????????????)","");
    if(ai_name == null || ai_name == ""){
        undo_purchase(ai_buddy_code_button);
        update_screen();
        return false;
    }
    var bonus_object = make_permanent_bonus('ai_buddy_code');
    bonus_object.name = capitalize(ai_name);
    update_permanent_bonuses();
}

create_neural_net_button.onclick = function() {
    if(!attempt_purchase(this)){ return; } //all rewards handled by start_cs_project()
    start_cs_project('cs_neural_net_projects', this);
}

create_language_button.onclick = function() {
    if(!attempt_purchase(this)){ return; }
    start_cs_project('cs_language_projects', this);
}

create_website_button.onclick = function() {
    if(!attempt_purchase(this)){ return; }
    start_cs_project('cs_website_projects', this);
}

create_math_solver_button.onclick = function() {
    if(!attempt_purchase(this)){ return; }
    start_cs_project('cs_math_solver_projects', this);
}

create_game_button.onclick = function() {
    if(!attempt_purchase(this)){ return; }
    start_cs_project('cs_game_projects', this);
}

//SUPER MATH SECTION

start_math_super_project_button.onclick = function() {
    if(!do_button_clicked(this)){
        return;
    }
    add_note("Math Super Project not available in this version");
    undo_purchase(this);
}

//SUPER CS SECTION

start_cs_super_project_button.onclick = function() {
    if(!do_button_clicked(this)){
        return;
    }
    var r=confirm("Are you sure? You won't be able to start any other super projects.");
    if (r==true){
        for (var key in this.reward){
            if(key != 'text'){
                player[key] += this.reward[key];
            }
        }
        add_note("Started Computer Science Super Project");
    }else{
        undo_purchase(this);
    }
    update_counts();
    update_screen();
    update_popup(this);
}

enter_matrix_button.onclick = function(){
    var r=confirm("Are you sure?  There is no return from the machine's world");
    if (r==true){
        end_animation('cs');
    }
}

ai_node_button.onclick = function(){
    cs_project_clicked(this);
}

design_ai_node.onclick = function(){
    if(!do_button_clicked(this)){ return; }
    if(player.ai_node_design_progress >= 100){//happens once (set up of project)
        var project_id = 'ai_node';
        player.cs_super_projects[project_id] = {};
        players_project = player.cs_super_projects[project_id]; //initializing
        initialize_cs_project(players_project); //sets status, bug_count, progress, value
        players_project.max_progress = 400;
        players_project.max_bugs = 1000;
        players_project.type = 'ai_node';
        players_project.name = "AI Node";
    }
    update_cs_super_projects()
    update_popup(this);
}

ai_buddy_button.onclick = function(){
    cs_project_clicked(ai_buddy_button);
}

design_ai_buddy_button.onclick = function(){
    if(!do_button_clicked(this)){ return; }
    if(player.ai_buddy_design_progress >= 100){//happens once (set up of project)
        var project_id = 'ai_buddy';
        player.cs_super_projects[project_id] = {};
        players_project = player.cs_super_projects[project_id]; //initializing
        initialize_cs_project(players_project); //sets status, bug_count, progress, value
        players_project.max_progress = 500;
        players_project.max_bugs = 1500;
        players_project.type = 'ai_buddy';
        players_project.name = "AI Companion";
    }
    update_cs_super_projects();
    update_popup(this);
}

self_editing_code_button.onclick = function(){
    cs_project_clicked(this);
}

design_self_editing_code_button.onclick = function(){
    if(!do_button_clicked(this)){ return; }
    if(player.self_editing_code_design_progress >= 100){//happens once (set up of project)
        var project_id = 'self_editing_code';
        player.cs_super_projects[project_id] = {};
        players_project = player.cs_super_projects[project_id]; //initializing
        initialize_cs_project(players_project); //sets status, bug_count, progress, value
        players_project.max_progress = 400;
        players_project.max_bugs = 1000;
        players_project.type = 'self_editing_code';
        players_project.name = "Self editing code";
    }
    update_cs_super_projects();
    update_popup(this);
}

self_correcting_code_button.onclick = function(){
    cs_project_clicked(this);
}
    
design_self_correcting_code_button.onclick = function(){
    if(!do_button_clicked(this)){ return; }
    if(player.self_correcting_code_design_progress >= 100){//happens once (set up of project)
        var project_id = 'self_correcting_code';
        player.cs_super_projects[project_id] = {};
        players_project = player.cs_super_projects[project_id]; //initializing
        initialize_cs_project(players_project); //sets status, bug_count, progress, value
        players_project.max_progress = 300;
        players_project.max_bugs = 600;
        players_project.type = 'self_correcting_code';
        players_project.name = "Self Correcting Code";
    }
    update_cs_super_projects();
    update_popup(this);
}

code_analizer_button.onclick = function(){
    cs_project_clicked(this);
}

design_code_analizer_button.onclick = function(){
    if(!do_button_clicked(this)){ return; }
    if(player.analizer_design_progress >= 100){ //happens once (set up of code analyzer project)
        var project_id = 'code_analizer'; //id = button's id
        player.cs_super_projects[project_id] = {};
        players_project = player.cs_super_projects[project_id]; //initializing
        initialize_cs_project(players_project); //sets status, bug_count, progress, value
        players_project.max_progress = 200;
        players_project.max_bugs = 400;
        players_project.type = 'code_analizer';
        players_project.name = "Code Analizer";
    }
    update_cs_super_projects();
    update_popup(this);
}

if(debug){
    var multiplier_element = document.getElementById('multiplier_text');
    multiplier_element.style.display = '';
    var speed_up_button = document.getElementById('speed_up');
    speed_up_button.style.display = '';
    speed_up_button.onclick = function(){
        debug_multiplier = debug_multiplier *2;
        multiplier_element.innerHTML = "x" + debug_multiplier;
    };
    var slow_down_button = document.getElementById('slow_down');
    slow_down_button.style.display = '';
    slow_down_button.onclick = function(){
        debug_multiplier = debug_multiplier/2;
        multiplier_element.innerHTML = "x" + debug_multiplier;
    };
}


function initialize(){ //run all the update type functions
    if(player.effort_per_second == 0){ //new game or game reset
        add_note('Born');
    }
    if(player.cs_resets > 0){
        add_note("custom css");
        var file_ref = document.createElement('link');
        file_ref.rel = 'stylesheet';
        file_ref.type = 'text/css';
        file_ref.href = 'cs.css';
        file_ref.media = 'screen,print';
        var body = document.getElementsByTagName('head')[0];
        body.appendChild(file_ref);
    }
    textify_update();
    math_contest_popup_text();
    math_timer();
    open_menu('main');
    player.next_math_level = 5; //reset these so they get updated by update_counts if something new was added
    player.next_cs_level = 5;
    update_cs_super_projects();
    update_cs_projects();
    update_screen();
    update_counts();
    autosaving.style.display = 'none';
    update_math_projects();
    update_permanent_bonuses();
    
    if(player.in_contest){
        disable(start_math_contest_button);
        do_math_contest_button.style.display = 'inline';
    }else{
        do_math_contest_button.style.display = 'none';
    }
    export_popup.style.display = 'none';
}

initialize();

save_game_button.onclick = function(){
    save_game();
    add_note("Game Saved");
}

function reset_game(){
    //TODO: adjust resetting as necessary for other changes
    //TODO: delete buttons by reference rather than by location
    while(cs_ongoing_section.firstChild){ 
        cs_ongoing_section.removeChild(cs_ongoing_section.firstChild);
    }
    while(math_ongoing_section.firstChild){
        math_ongoing_section.removeChild(math_ongoing_section.firstChild);
    }
    for(var key in player_reset_copy){ //copy all the default values immediately, use these values during a reset
        player[key] = player_reset_copy[key];
        //TODO: check if key is a dict, if so make new version of it
    }
    player.math_research_projects = {}; //make new versions of these so the ones from reset copy don't get changed
    player.cs_projects = {};
    player.cs_super_projects = {};
    player.permanent_bonuses = {};
}

function special_reset(type){ //end of game resetting (keep some stuff)
    var bonus_save = player.permanent_bonuses;
    var time_save = player.seconds_played + player.all_seconds_played;
    var math_resets_save = player.math_resets;
    var cs_resets_save = player.cs_resets;
    if(type == 'math'){
        math_resets_save += 1;
    }else if(type == 'cs'){
        cs_resets_save += 1;
    }
    reset_game()
    player.permanent_bonuses = bonus_save;
    player.all_seconds_played = time_save;
    player.math_resets = math_resets_save;
    player.cs_resets = cs_resets_save;
    initialize();
}

reset_game_button.onclick = function(){
    var r = confirm("Really Reset Everything?");
    if(r == true){
        reset_game();
        initialize();
    }
}

export_game_button.onclick = function(){
    if(export_popup.style.display == 'none'){
        export_popup.style.display = '';
        var game_save = btoa(JSON.stringify(player));
        export_popup.innerHTML = game_save;
    }else{
        export_popup.style.display = 'none';
    }
}

import_game_button.onclick = function(){
    var potential_game_save = prompt("Paste your exported save","");
    potential_game_save
    if(potential_game_save && potential_game_save != ""){
        var saved_player = false;
        var error = "";
        try{
            saved_player = JSON.parse(atob(potential_game_save));
        }catch(err){
            error = err
        } //give them a note if there is a parse error or whatever
        if(saved_player && saved_player.version && saved_player.contest_winnings && saved_player.max_effort){
            //check that a few of the variables exist to make sure that its a valid save
            reset_game(); //destroy existing stuff first
            load_save(saved_player);
            initialize();
        }else{
            add_note("ERROR: Failed to load save");
            //add_note(error);
        }
    }
}

donate_button.onclick = function(){
    if(donate_popup.style.display == 'none'){
        donate_popup.style.display = '';
        player.donate_button_clicks += 1;
        if(player.donate_button_clicks == 1){
            var reward = nice_round(Math.max(50, player.money * .2), 2);
            add_note("Thank you for considering a donation");
            add_note("Have $" + number_to_text(reward));
            player.money += reward;
            update_counts();
        }
    }else{
        donate_popup.style.display = 'none';
    }
}

var autosave_timer = 0;
var ticker = 0;

//Main loop ticker.  (does all over time things)
setInterval(function () { 
    var effort_rate = player.effort_per_second;
    var money_rate = player.money_per_second + player.cs_active_games * 1;//was 0.5 for some reason, caused a bug
    money_rate = money_rate * Math.pow(cs_money_multiplier, player.cs_active_websites);
    money_rate = money_rate * Math.pow(math_money_multiplier, player.math_research_money_bonus);
    var calculation_rate = player.calculations_per_second * Math.pow(math_calc_multiplier, player.math_research_calculation_bonus);
    calculation_rate *= Math.pow(cs_calc_multiplier, player.cs_active_math_solvers);
    calculation_rate *= player.calculations_multiplier;
    var code_rate = player.code_per_second * Math.pow(math_code_multiplier,player.math_research_code_bonus);
    code_rate *= Math.pow(cs_code_multiplier, player.cs_active_neural_nets);
    code_rate *= player.code_multiplier;
    
    var multiplier = 1;
    if(debug){
        multiplier = debug_multiplier;
    }
    player.effort += effort_rate*multiplier;
    player.money += money_rate*multiplier;
    player.calculations += calculation_rate*multiplier;
    player.code += code_rate*multiplier;
    
    player.seconds_played += debug_multiplier;
    
    contest_time -= 1 * multiplier;
    //player.money = contest_time; //Test line
    if(contest_time <= 0){
        math_timer();
    }
    
    autosave_timer = (autosave_timer+1)%20 //autosave every 20 sec
    if(autosave_timer == 0 && player.school >= 2){
        autosaving.style.display = '';
        save_game();
    }else{
        autosaving.style.display = 'none';
    }
    
    if(player.cs_active_self_correcting_code == 0){ //no more active project bugs when self correction code
        var bug_special = Math.pow(cs_bug_multiplier, player.cs_active_languages);
        var new_bug_special = bug_special * (1+player.cs_active_code_analyzer); //either multiply by 1 or 2
        for(var key in player.cs_projects){
            //1 in 6000 chance to bug per second (lasts ~1.6 hours on average)
            var players_project = player.cs_projects[key];
            //x times speed means x times bug chance
            if(players_project.status == 'active'  && Math.random() * 6000/multiplier * new_bug_special < 1.0){
                players_project.bug_count = Math.floor(players_project.max_progress/10 * Math.random()/bug_special);
                players_project.max_bugs = players_project.bug_count; //reset the max number of bugs
                if(players_project.bug_count > 0){
                    add_note(players_project.bug_count + " bugs appeared in " + players_project.name);
                    players_project.status = 'bugged';
                    update_cs_projects();
                }
            }
        }
        if(player.cs_super_projects.code_analizer){ //only super project capable of getting bugs
            var analizer_project = player.cs_super_projects.code_analizer;
            if(analizer_project.status == 'active' && Math.random() * 10000/multiplier * new_bug_special < 1.0){
                analizer_project.bug_count = Math.floor(analizer_project.max_progress/10 * Math.random()/bug_special);
                analizer_project.max_bugs = analizer_project.bug_count;
                if(analizer_project.bug_count > 0){
                    add_note(analizer_project.bug_count + " bugs appeared in Code Analyzer");
                    analizer_project.status = 'bugged';
                    player.cs_active_code_analyzer = 0;
                    update_cs_projects();
                    update_cs_super_projects();
                    update_screen();
                }
            }
        }
    }
    

    var tick_bonus = (1+player.cs_active_ai_nodes)*multiplier; //do ticker more frequently
    var ai_multiple = tick_bonus/64 //64 required to start getting multiples
    if(player.cs_active_ai_nodes >=64){ //was a little too slow so I accelerated the free endgame a bit
        ai_multiple = ai_multiple * Math.log(player.cs_active_ai_nodes)/Math.log(64);
    }
    ai_multiple = Math.ceil(ai_multiple);
    ticker = (ticker + 1) % Math.max(1, Math.ceil(16/tick_bonus));
    if(player.cs_active_self_editing_code && ticker < 1){
        for(var project_id in player.cs_projects){
            var players_project = player.cs_projects[project_id];
            var project_button = document.getElementById(project_id);
            if(project_button && players_project.status == 'started'){
                if((players_project.progress+.0001)/players_project.max_progress > player.edit_limit){
                    cs_project_clicked(project_button, true); //attempt purchase, dont show failures
                }
            }
        }
        for(var project_id in player.cs_super_projects){ //SUPER
            var players_project = player.cs_super_projects[project_id];
            var project_button = document.getElementById(project_id);
            if(project_button && players_project.status == 'started'){
                if((players_project.progress+.0001)/players_project.max_progress > player.edit_limit){
                    cs_project_clicked(project_button, true, ai_multiple); //attempt purchase, dont show failures
                }
            }
        }
        update_cs_projects();
        update_cs_super_projects();
    }
    update_counts(); 
}, 1000); //update stuff once per second
