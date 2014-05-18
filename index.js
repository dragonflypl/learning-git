var indexApp = angular.module('indexApp', []);

indexApp.controller('IndexCtrl', function ($scope) {

    $scope.cheatSheetOne =
    [
        new CheatSheetInfo(
            'CREATE REPOSITORIES',
            'Start a new repository or obtain one from an existing URL',
            [
                new Sample(
                    'git init [project-name]',
                    'Creates a new local repository with the speciﬁed name'),
                new Sample(
                    'git clone [url]',
                    'Downloads a project and its entire version history'
                )
            ]
        ),
        new CheatSheetInfo(
            'CONFIGURE TOOLING',
            'Conﬁgure user information for all local repositories',
            [
                new Sample(
                    'git config --global user.name "[name]"',
                    'Sets the name you want atached to your commit transactions'
                ),
                new Sample(
                    'git config --global user.email "[email address]"',
                    'Sets the email you want atached to your commit transactions'
                ),
                new Sample(
                    'git config --list',
                    'See git configuration'
                )
            ]
        ),
        new CheatSheetInfo(
            'MAKE CHANGES',
            'Review edits and craf a commit transaction',
            [
                new Sample(
                    'git status',
                    'Lists all new or modiﬁed ﬁles to be commited. Shows difference between working copy, staging index and repository'
                ),
                new Sample(
                    'git add [file]',
                    'Adds file to staging area'
                ),
                new Sample(
                    'git add [filename] --u',
                    'Adds file(s) that are already in repo to staging area'
                ),
                new Sample( 
                    'git add --A',
                    'Adds file(s) to staging area, including new'
                )
            ],
            [
                new Hint(
                    'Git’s notion of Staging Index',
                    'set of files to be updated with next commit'
                )
            ]

        )
    ];

    function CheatSheetInfo(name, desc, samples, hints) {
        this.name = name;
        this.desc = desc;
        this.samples = samples;
        this.hints = hints;
    }

    function Hint(name, desc) {
        this.name = name;
        this.desc = desc;
    }

    function Sample(code, desc) {
        this.code = code;
        this.desc = desc;
    }
});