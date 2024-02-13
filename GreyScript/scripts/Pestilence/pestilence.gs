// 	ESSENCIALS

art = "\n               .               \n            ,'/ \`.            \n           |\/___\/|           \n           \'\   /`/           \n            `.\ /,'            \n               |               \n               |               \n              |=|              \n         /\  ,|=|.  /\         \n     ,'`.  \/ |=| \/  ,'`.     \n   ,'    `.|\ `-' /|,'    `.   \n ,'   .-._ \ `---' / _,-.   `. \n    ,'    `-`-._,-'-'    `.    \n   '                       `   \n         • Pestilence •          \n"

import_code("/lib/pestLibs/pestClass")
import_code("/lib/pestLibs/pestExploit")

//	 ————————————————————

opt = ["Automate Exploit", "Mapper", "LibScanner"]
altOpt = ["Locker", "Security Test", "File Burner", "Organizer"]

//	 == Alt Tools ==

lock = function()
	exit("Lock")
end function

test = function()
	exit("Test")
end function

trash = function()
	exit("Trash")
end function

filer = function()
	exit("Filer")
end function


//	 == CHECKING FUNCTIONS ==

paramsColumn = function()		
	
	print(art)
	helpinfo = [{ "nm" : "  " + "[Param Name]".replace(" ",char(160)) + " ", "alt" : "[Alt Name]".replace(" ",char(160)) + " ", "desc" : "[Description] ", "example" : "[Example]"},{ "nm" : "  " + "[help] ", "alt" : "[-h] ", "desc" : "[Shows the Help]".replace(" ",char(160)), "example" : " " + "[pestilence.plg -h]".replace(" ",char(160))},{ "nm" : "  " + "[altTools] ", "alt" : "[-t] ", "desc" : "[Alternative Tools]".replace(" ",char(160)), "example" : " " + "[pestilence.plg -t]".replace(" ",char(160))}]
	paramcol = "\n"
	
	for i in helpinfo
		for key in i
			paramcol = paramcol + key.value
		end for
		paramcol = paramcol + "\n"
	end for
	
	return format_columns(paramcol)
	
end function

writeOptions = function(option)
	
	clear_screen
	print(art)
	
	for op in option
		i = option.indexOf(op) + 1
		print("<b>    " + i + " </b>•<b> " + op)
	end for
	
	print("\n<b>    0 </b>•<b> Exit")
	
end function

getOption = function(t)
	if t == 1 then
		
		writeOptions(options)
		i = chooseTool()
		
		if i == 1 then exploit()
		if i == 2 then mapper()
		if i == 3 then router()
		
	else if t == 2 then
		
		writeOptions(options1)
		i = chooseTool()
		
		if i == 1 then lock()
		if i == 2 then test()
		if i == 3 then trash()
		if i == 4 then filer()
		
	else
		exit("<color=red><b>ERROR></b> Tools not provided.")
	end if
end function

//	 == CHECKING ==

if params.len == 1 then
	if params[0] == "-t" then
		t = 2
		getOption(t)
	else if params[0] == "-h" then
		clear_screen
		exit(paramsColumn)
	end if
else
	t = 1
	getOption(t)
end if