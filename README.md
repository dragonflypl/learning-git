learning-git
============

# Git Theory

## Areas

Git stores content in three "areas":

Working Directory -> Staging Area (index) - > Git Repository

## Git References

Git References (so called "treeish") are a way to access specyfic commits. It can be accessed with:

- SHA-1 Hash (full or 6-7 characters which is usually enough)
- Branches - latest commit on a specyfic branch
- Tags
- HEAD - latest commit on current branch
- Ancestry Refs: HEAD HEAD~ HEAD~2 HEAD~3

```git ls-tree HEAD``` - list the files in the repository at particular time, here HEAD

# Configuration

Configuration is set on three levels: system, global (user), local (repository):

```git config --system``` : machine configuration

```git config --global``` : user level configuration

```git config``` : project level configuration

Sample & basic configuration:

``git config --global user.name "Paweł Waszczyński"```

``git config --global user.email "waszczynski@gmail.com"```

```git config --global color.ui true```

## Configuring the editor:

```git config --global core.editor "'C:/Program Files (x86)/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"```

## Setting aliases

```git config --global aliag.<aliasname> "<command>"```

E.g.

Modified log command that gives some visual info about commits:

```git config --global alias.lgas "log --graph --oneline --all --decorate  --max-count 10"```

    git lga
    * d060744 (HEAD -master) Fourth
    | * 06f748e (feature) Commit on feature branch
    |/
    * 7353cf1 Second commit
    * a96544f First commit
    * 36fd579 (origin/master, origin/HEAD) Initial commit

# Git Basics

```git init``` - creates empty repository with hidden .get folder (only one - no nested .git folders)

## Staging Area

Git’s notion of Staging Index - set of changes to be updated with next commit. 

To add the file to staging area issue:

- ```git add filename``` : start tracking new file or add changes of already tracked file to staging area
- ```git add --u```: add to staging area files already in repo
- ```git add --A```: add all files, including new

**TIP** : ```git add -i``` enters interactive mode that enables "partial" commits (e.g. stage parts of the file).

Git records **changes** in file's content.

**Some changes in the file's content can be in staging area (will be shipped with next commit), and other may not.**

## Checking repository status:

```git status``` - shows difference between **working copy**, **staging index ** and **repository**

### Changes to the files

Because git has three "areas" (working copy, staging index & repository) there're three ways to compare changes:

- ```git diff``` : shows the changes between the working directory and the index. This shows what has been changed, but is not staged for a commit.

- ```git diff --staged``` : shows the changes between the index and the HEAD (which is the last commit on the branch). This shows what has been added to the index and staged for a commit.

- ```git diff HEAD``` : shows all the changes between the working directory and HEAD (which includes changes in the index). This shows all the changes since the last commit, whether or not they have been staged for commit or not.

Add ```--name-only``` flag to list only files with changes: ```git diff --name-only --cached```.

To to diff for one file, use filename as parameter e.g.: 

```git diff README.MD```

More advanced usage:

- ```git diff <treeish1> <treeish2> filename``` - e.g. ```git diff HEAD~ HEAD README.md``` shows changes in the file between HEAD and HEAD-1
- ```git diff <treeish1>..<treeish2>``` - e.g. ```git diff 36fd579..HEAD``` shows all changes between two commits (36fd579 and HEAD)
- ```git diff <branchA> <branchB>``` - if both arg are branch names we get differences between them
- ```git diff --stat --summary <treeish1>..<treeish2>``` - show some stats & summary
- ```git diff -w``` - ignore whitespace

### Log

- ```git log``` : simply shows history
- ```git log --since``` (or --after etc, many options are available)
- ```git log sha1..sha2``` - specify a range
- ```git log sha1.. --author username filename``` - gives logs that affect a file since sha1 and made by username
- ```git log --pretty="%h, %cn, %cr"``` - custom log report
- ```git log -n``` : limits to n number of commits
- ```git log --grep="message"``` : search with regex
- ```gitk``` - graphical tool to view history (shipped with git)

By default ```git log``` shows log only for current branch.

- ```git log --all``` : view log from all branches use

```--online``` switch reduces log info to one:

    > git log --oneline --all
    3da6a59 Update readme
    5783114 Clean up of readme
    5bec871 Merged experimental
    313b94d Experimental checkin  

## Commiting

Each commit has a hash which is calculated with this formula:

    sha1(
	    meta data
	    commit message
	    commiter
	    commit date
	    author
	    authoring date
	    Hash-Of-Entire-Working-Directory
    )

- ```git commit``` - opens up text editor for supplying commit message
- ```git commit -a``` - commits changes & automatically stage all tracked, modified files before the commit (the same as ```git add``` + ```git commit```)
- ```git commit -m "commit message"``` - enables adding commit message as string after ```-m```


**TIP:** To change/amend message/content of last commit, use:

- ```git commit --amend -o -m "New commit message"``` - changes only message (-o)
- ```git commit --amend -m "New commit message"``` - changes previous commit by also commiting currently staged changes + modifies message. Useful when you forgot to add include something in previous commit

# Branches

## Listing branches

- ```git branch``` - lists branches
- ```git branch -a``` : lists all branches, including remote ones
- ```git branch -r``` : lists only remote branches

## Creating branches

- ```git branch branch-name``` - creates new branch, **but does not switch repo to that branch yet**
- ```git branch branchname <treeish>``` - creates a branch from particular commit
- ```git branch --move oldname newname``` - renames branch


## Switching to branch

- ```git checkout -b branch-name``` - create & switch to branch. **Git allows to change branches with changes in index & working directory, provided they don't cause overrides**
- ```git checkout branch-name``` - switch to branch

## Merging changes between branches

There're two ways to merge changes: merge & rebase.

### Merging with merge

- ```git merge <branch-name>``` : merges changes from branch-name into current branch. 


**Merge creates additional commit**:


    *   0017058 (HEAD -> master) Merge branch 'feature'
    |\
    | * befa7a0 (feature) Line four commit
    | * 46555f0 Line three commit
    * | b8a1df9 Title updated
    |/
    * a756e66 Line two commit
    * b6be659 Line one commit
    * 36fd579 (origin/master, origin/HEAD) Initial commit


**TIP:** how to check if branch is merged? ```git branch --merged``` lists branches that are included in the current branch.

### Merging with rebase

- ```git rebase branchname``` - tries to replay changes made to current branch to branchname

Why rebase:
- keeps history cleaner & linear (no additional merge commits)

Before:

    * 6eb6e94 (HEAD -> master) Title updated  
    | * 2c8811f (feature) Line four commit
    | * 1d4235c Line three commit 
    |/
    * 9eb041a Line two commit 
    * 8fee707 Line one commit 
    * 36fd579 (origin/master, origin/HEAD) Initial commit     

After ```git rebase feature```:

    > git rebase feature
    First, rewinding head to replay your work on top of it...
    Applying: Title updated

And graph:

    > git lga
    * f6e1f04 (HEAD -> master) Title updated
    * 2c8811f (feature) Line four commit
    * 1d4235c Line three commit
    * 9eb041a Line two commit
    * 8fee707 Line one commit
    * 36fd579 (origin/master, origin/HEAD) Initial commit

## Merge conflicts

## Deleting branches

- ```git branch -d branch-name``` - deletes branch-name. To be clear: it does not delete any content from repository, it just removes named reference (branch) to commit.

## Remotes

- ```git remote add <name> <link>``` : creates a remote
- ```git remote -v``` : lists remotes
- ```git push <remotename> --delete <branchname>```

### "Communication" with remote

- ```git fetch <remote-name>``` : synchronize remote repository (name is not needed if only one remote is configured)
- ```git pull``` - simple as that. Basically this command does the same as (when run on master branch with proper link to remote is established) :
 - ```git fetch```
 - ```git merge origin/master``` : By having two steps we can see changes before merge e.g.: ```git diff master origin/master```
- ```git push -u <remote-name> <branch-name>``` : pushes to remote a branch (```-u``` options makes a connection to remote branch used when pushing/fetching. When used it's no longer needed to configure remote branch with ```--set-upstream```)


**TIP**: .\.git\config - contains branch definition that specifies which remote is associated with our branch when we do push & fetch

**TIP:** remote branch cannot be checked out! To "checkout" remote branch (create a branch with a starting point from remote) use:

```git checkout -b local-branch-name origin/remote-branch-name```

### Tracking remote branches

- ```git branch --set-upstream-to <remote-branch>``` - make a connection between current branch and remote branch. Any future git pull command (with the current local branch checked-out), will attempt to bring in commits from the <remote-branch> into the current local branch, e.g. ```git branch --set-upstream-to origin/master```


# Stashing

## Creating stash

- ```git stash``` : take changes on current branch aside
 - ```git stash save "message"``` - stash with a message
- ```git stash list``` : lists all stashes 

To include untracked files, use ```--include-untracked```.

## Viewing stash

- ```git stash show -p <stashid>```

## Using stash

- with **apply** (apply leaves stash on the list)
 - ```git stash apply``` : take latest stash and apply changes to working directory
 - ```git stash apply <stash-id>``` : applies particular stash
- with **pop**
 - ```git stash pop``` : takes latest stash, applies it and drops it
 - ```git stash pop <stash-id>``` : the same for above for particular stash

- ```git stash branch branchname``` - unstash to a branch


## Removing stash

- ```git stash drop <stashid>```
- ```git stash clear```

# Reverting changes

- ```git checkout <treeish> -- <filename>``` : gets file from repository into index
- ```git reset HEAD filename``` : replace staged file with repository content, and keep file changes in working directory. To rephrase: move all changes to working directory.
- ```git reset - --soft <treeish>``` : does not touch index / working directory and only moves HEAD. Useful when merging multiple commits (provided commits were are in sequence)
- ```git revert <sha#>``` : reverts changes made in commit by applying another commit 

Reset flavours:

- ```--soft``` : moves HEAD & does not change staging index or working directory
- ```--mixed``` (default):  moves HEAD & changes staging index to match repository
- ```--hard```: moves HEAD & changes staging index and working directory to match repository

# Other

- ```git cherry-pick hash``` - gets changes made in particular commit and applies them to current branch
- ```git rm <filename>``` - remove file from repository
- ```git rm --cached filename``` : ignore already tracked file (removes from repo but leaves in working directory for ignoring)
- ```git mv <oldname> <newname>``` : renamve / move existing file
- ```git clean -f``` - removes all untracked files (use ```git clean -n``` for test run)
- ```.gitkeep``` : put this dummy file in empty directory that needs to be commited (git by default ignores empty directories)
- ```git merge kdiff3```: use kdiff3 http://www.blog.project13.pl/index.php/coding/1192/setup-git-on-windows-to-use-kdiff3-as-its-mergetool/
- ```git tag``` - lists tags in repo 
- ```git show-ref <branchname>``` - quick way to see commits associated with branches
- Rebase vs Merge - it turns out that rebase deletes merge commits (mind-boggling)! It's described here: https://www.derekgourlay.com/blog/git-when-to-merge-vs-when-to-rebase/ . 

# Rebase vs Merge:

The Golden Rule of Rebasing: never use it on public branches

Rules of thumb:
- When pulling changes from origin/develop onto your local develop use rebase.
- When finishing a feature branch merge the changes back to develop.

Common usages of rebase:
- cleaning up local history
- incorporating upstream changes into a feature
- integrating an approved feature: by performing a rebase before the merge, you’re assured that the merge will be fast-forwarded, resulting in a perfectly linear history. This also gives you the chance to squash any follow-up commits added during a pull request.

When not to use rebase:
- after pushing / PR. As soon as you make the pull request, other developers will be looking at your commits, which means that it’s a public branch. Re-writing its history will make it impossible for Git and your teammates to track any follow-up commits added to the feature. Any changes from other developers need to be incorporated with git merge instead of git rebase.

# Recovering 

- ```git reflog``` - gives of log where HEAD has pointed. Find the commit you wish to restore

# Resources

- [https://www.atlassian.com/git/tutorials/merging-vs-rebasing/workflow-walkthrough](https://www.atlassian.com/git/tutorials/merging-vs-rebasing/workflow-walkthrough "Merging vs. Rebasing") - Merging vs. Rebasing
- [https://www.derekgourlay.com/blog/git-when-to-merge-vs-when-to-rebase/](https://www.derekgourlay.com/blog/git-when-to-merge-vs-when-to-rebase/ "Git - When to Merge vs. When to Rebase") - Git - When to Merge vs. When to Rebase
- [http://blog.thoughtram.io/git/2014/11/18/the-anatomy-of-a-git-commit.html](http://blog.thoughtram.io/git/2014/11/18/the-anatomy-of-a-git-commit.html "The anatomy of a Git commit") - The anatomy of a Git commit
- [http://stackoverflow.com/questions/2530060/can-you-explain-what-git-reset-does-in-plain-english](http://stackoverflow.com/questions/2530060/can-you-explain-what-git-reset-does-in-plain-english "How git reset works") - how git reset works
- [https://help.github.com/articles/set-up-git](https://help.github.com/articles/set-up-git "Password Caching") : Password caching
- [https://help.github.com/articles/generating-ssh-keys#platform-windows](https://help.github.com/articles/generating-ssh-keys#platform-windows "Generating SSH Keys") : Generating SSH Keys


- What is 'recursive stragegy'
- What is 'fast-forward'
