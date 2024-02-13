//  == GHFETCH == 

vers = "v1.3"
creator = "pl4g_"
sh = get_shell											// Shell Object
comp = sh.host_computer								// Computer Object
meta = include_lib("/lib/metaxploit.so")		// Metaxploit Lib (for the kernel)

// An easy to use and edit fetch made on GreyScript for GreyHack.

//  == DOCUMENTATION ==  //

// art <- Picks an ASCII art from a text file. Default Value: parameter from command line
// os <- Operational System. Default Value: "GreyHackOS"
// kernel <- Kernel Version. Default Value: get_router.kernel_version
// hduse <- Hard Disk Usage. Default Value: (slice(str(comp.File("/").size.to_int / 2^20), 0, 6) + " MiBs Used")




//  == VARIABLES ==  //

art = comp.File("path/to/file") // <- Can be permanently set
os = "GreyHackOS"                                                            
kernel = meta.load("/lib/kernel_module.so").lib_name + " " + meta.load("/lib/kernel_module.so").version
hduse = (slice(str(comp.File("/").size.to_int / 2^20), 0, 6) + " MiBs Used")





// == CLASSES == //

Error = {}																				// Error Class being created
Error.desc = "\n<color=orange>Use [-h] or [help] parameter for help"					// Error Description property being created
Error.report = function()																// Error Reporting function being defined
	return "<color=red><b><i>ERROR: </i></b>" + self.desc
end function

paramsError = new Error														// Parameter error, called when a parameter is called wrong
paramsError.desc = "Wrong or Missing Parameter" + Error.desc

artError = new Error
artError.desc = "ASCII Art path not defined, please write it bellow"




//  == CHECKING ==  //

paramsColumn = function()						// Function called on ghfetch -h
												// Set's it's classes and variables
												// and prints every information about parameters on the terminal
	helpinfo = [{ "nm" : "<color=#fff>[Param Name]".replace(" ",char(160)) + " ", "alt" : "[Alt Name]".replace(" ",char(160)) + " ", "desc" : "[Description] ", "number" : "[Arguments] ", "example" : "[Example]"}, { "nm" : "<color=green>[help] ", "alt" : "[-h] ", "desc" : "[Shows the Help]".replace(" ",char(160)), "number" : " [1] ", "example" : "[ghfetch -h]".replace(" ",char(160))} , { "nm" : "<color=green>[info] ", "alt" : "[-i] ", "desc" : "[Outputs the Information about GHFetch]".replace(" ",char(160)), "number" : " [1] ", "example" : "[ghfetch -i]".replace(" ",char(160))}, { "nm" : "<color=green>[version] ", "alt" : "[-v] ", "desc" : "[Quickly show the version]".replace(" ",char(160)), "number" : " [1] ", "example" : "[ghfetch -v]".replace(" ",char(160))}, { "nm" : "<color=green>[path] ", "alt" : "[-p] ", "desc" : "[Sets the ASCII Art path] ".replace(" ",char(160)), "number" : " [2] ", "example" : "[ghfetch -p /path/to/file.txt]".replace(" ",char(160))}]
		
	paramcol = "\n"
	// Were the function really starts
	// Picks every information about the parameters
	// Then prints them with formated columns 
	for i in helpinfo
		for key in i
			paramcol = paramcol + key.value
		end for
		paramcol = paramcol + "\n"
	end for
	print(format_columns(paramcol))
end function

checkArt = function()								// The function that checks for ASCII Art text file
	while true
		if globals.art then
			globals.art = globals.art.get_content
			break
		end if
		if not globals.art then
			print(artError.report)
			globals.art = comp.File(user_input("<b>Path></b> "))
			clear_screen
			checkArt()
			break
		end if
	end while
end function
														// Search for the parameters
while true												// Available parameters: -h, -i, -v, -p
	if params.len == 0  then
		checkArt()
		break
	end if
	
	if params[0] == "-h" or params[0] == "help" then
		if params.len == 1 then 
			exit(paramsColumn + "<color=yellow><b>Note:</b> Can be used without parameters")
		else
			exit(paramsError.report)
		end if
	else if params[0] == "-v" or params[0] == "version" then
		if params.len == 1 then 
			exit("<color=#fff><b>ghfetch</b><i> " + vers)
		else
			exit(paramsError.report)
		end if
	else if params[0] == "-i" or params[0] == "info" then
		if art then
			if params.len == 1 then 
				exit("<color=#fff><b>Name: </b><i>ghfetch</i></color>\n<color=#fff><b>Version: </b><i>" + vers + "</i></color>\n<color=#fff><b>Creator: </b><i>" + creator + "</i></color>\n<color=#fff><b>Current Art: </b><i>" + art.path + "</i></color>")
			else
				exit(paramsError.report)
			end if
		else
			if params.len == 1 then 
				exit("<color=#fff><b>Name: </b><i>ghfetch</i></color>\n<color=#fff><b>Version: </b><i>" + vers + "</i></color>\n<color=#fff><b>Creator: </b><i>" + creator + "</i></color>")
			else
				exit(paramsError.report)
			end if
		end if
	else if params[0] == "-p" or params[0] == "path" then					// If the first parameter equals to -p search for an argument after -p
		if params.len == 2 then																	// If it has the argument, choose art from file, if not report the error
			globals.art = comp.File(params[1])										// Used to choose the art path do you want by the command line (usefull if the user has multiple arts
			checkArt()
		else
			exit(paramsError.report)
		end if
	else
		exit(paramsError.report)
	end if
	break
end while


//  == IMPORTANT CODE ==  //

// Sets more information needed to ghfetch.
info = { "art" : art.split("\n"), "localip" : comp.local_ip, "publicip" : comp.public_ip, "netCard" : comp.active_net_card, "user" : active_user, "date" : current_date.replace("-", "/") } 

fetch = function()
	for line in info["art"]
		if line == info["art"][2] then
			print(line + "OS: " + os)
		else if line == info["art"][3] then
			print(line + "Kernel: " + kernel)
		else if line == info["art"][4] then
			print(line + "Hard Disk Usage: " + hduse)
		else if line == info["art"][5] then
			print(line + "Active Net Card: " + info["netCard"])
		else if line == info["art"][6] then
			print(line + "Public IP Address: " + info["publicip"])
		else if line == info["art"][7] then
			print(line + "Local IP Address: " + info["localip"])
		else if line == info["art"][8] then
			print(line + "Current User: " + info["user"])
		else if line == info["art"][9] then
			print(line + "Current Date: " + info["date"])
		else 
			print(line)
		end if
	end for
end function

fetch()


