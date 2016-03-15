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

```git config --global alias.lga "log --graph --oneline --all --decorate"```

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


**TIP:** To change/amend message of last commit, use:

```git commit --amend -o -m "New commit message"```

# Branches

## Listing branches

- ```git branch``` - lists branches
- ```git branch -a``` : lists all branches, including remote ones

## Creating branches

- ```git branch branch-name``` - creates new branch, **but does not switch repo to that branch yet**

## Switching to branch

- ```git checkout -b branch-name``` - create & switch to branch. **Git allows to change branches with changes in index & working directory, provided they don't cause overrides**
- ```git checkout branch-name``` - switch to branch

## Merging changes between branches

There're two ways to merge changes: merge & rebase.

### Merging with merge

- ```git merge branch-name``` : merges changes from branch-name into current branch. 


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

Why rebase:
- keeps history cleaner & linear

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

### "Communication" with remote

- ```git push <remote-name> <branch-name>``` : pushes to remote a branch
- Pulling changes:
 - ```git pull``` - simple as that. Basically this command does the same as (when run on master branch with proper links...) :
      - ```git fetch```
      - ```git merge origin/master```
      - By having two steps we can see changes before merge e.g.: ```git diff master origin/master```

# Stashing

## Creating stash

- ```git stash``` : take changes on current branch aside
 - ```git stash save "message"``` - stash with a message
- ```git stash list``` : lists all stashes 

## Using stash

- with **apply** (apply leaves stash on the list)
 - ```git stash apply``` : take latest stash and apply changes to working directory
 - ```git stash apply <stash-id>``` : applies particular stash
- with **pop**
 - ```git stash pop``` : takes latest stash, applies it and drops it
 - ```git stash pop <stash-id>``` : the same for above for particular stash

# Resources

- [http://blog.thoughtram.io/git/2014/11/18/the-anatomy-of-a-git-commit.html](http://blog.thoughtram.io/git/2014/11/18/the-anatomy-of-a-git-commit.html "The anatomy of a Git commit") - The anatomy of a Git commit
- [http://stackoverflow.com/questions/2530060/can-you-explain-what-git-reset-does-in-plain-english](http://stackoverflow.com/questions/2530060/can-you-explain-what-git-reset-does-in-plain-english "How git reset works") - how git reset works

- What is 'recursive stragegy'
- What is 'fast-forward'
