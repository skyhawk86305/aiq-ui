if (process.argv.length != 4) {
    console.log("Usage: CreateHtmlReport sourcefile targetdir");
    console.log("example: CreateHtmlReport junitdir/junitresults.xml target/htmlreports");
    process.exit(-1);
}

var source_file = process.argv[2];
var target_path = process.argv[3];
var indexStyleSheetHeader = "<?xml-stylesheet type=\"text/xsl\" href=\"index.xsl\"?>";
var suiteStyleSheetHeader = "<?xml-stylesheet type=\"text/xsl\" href=\"testsuitestylesheet.xsl\"?>";

var fs = require('fs-extra'),
    xml2js = require('xml2js'),
    mkdirp = require('mkdirp');

var parser = new xml2js.Parser();

mkdirp(target_path, function (err) {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
    console.log(target_path + ' directory created')
});

fs.readFile(source_file, 'utf-8', function (err, data){
    parser.parseString(data, function(err, result){
        if(err) {
            console.log(err);
            process.exit(-1);
        }
        var builder = new xml2js.Builder({headless: true});
        var xml = builder.buildObject(result);

        // Create index file
        fs.writeFile(target_path + '/index.xml', indexStyleSheetHeader + '\n' + xml, function(err, data){
            if (err) {
                console.log(err);
                process.exit(-1);
            }
            console.log("successfully wrote " + target_path + '/index.xml');
        });

        // Create suite files
        result['testsuites']['testsuite'].forEach(function(element,i){
            var builder = new xml2js.Builder({rootName: 'testsuite', headless: true});
            var xml = builder.buildObject(element);
            var index = i + 1;
            fs.writeFile(target_path + '/suite' + index + '.xml' , suiteStyleSheetHeader + '\n' + xml, function(err, data){
                if (err) {
                    console.log(err);
                    process.exit(-1);
                }
            })
        });
        console.log("successfully wrote " + target_path + '/suite(n).xml');
    });
});

