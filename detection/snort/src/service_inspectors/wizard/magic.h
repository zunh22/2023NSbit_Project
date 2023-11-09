//--------------------------------------------------------------------------
// Copyright (C) 2014-2021 Cisco and/or its affiliates. All rights reserved.
//
// This program is free software; you can redistribute it and/or modify it
// under the terms of the GNU General Public License Version 2 as published
// by the Free Software Foundation.  You may not use, modify or distribute
// this program under any other version of the GNU General Public License.
//
// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//--------------------------------------------------------------------------
// magic.h author Russ Combs <rucombs@cisco.com>

#ifndef MAGIC_H
#define MAGIC_H

#include <string>
#include <vector>

class MagicBook;

struct MagicPage
{
    std::string key;
    std::string value;

    MagicPage* next[256];
    MagicPage* any;

    const MagicBook& book;

    MagicPage(const MagicBook&);
    ~MagicPage();
};

typedef std::vector<uint16_t> HexVector;

// MagicBook is a set of MagicPages implementing a trie

class MagicBook
{
public:
    virtual ~MagicBook();

    MagicBook(const MagicBook&) = delete;
    MagicBook& operator=(const MagicBook&) = delete;

    virtual bool add_spell(const char* key, const char*& val) = 0;
    virtual const char* find_spell(const uint8_t*, unsigned len, const MagicPage*&) const;

    const MagicPage* page1() const
    { return root; }

    virtual void set_bookmark(const MagicPage* page = nullptr) const
    { (void)page; }
    virtual const MagicPage* get_bookmark() const
    { return nullptr; }

protected:
    MagicBook();
    MagicPage* root;

    virtual const MagicPage* find_spell(const uint8_t*, unsigned,
        const MagicPage*, unsigned) const = 0;
};

//-------------------------------------------------------------------------
// spells - a sequence of case insensitive text strings with wild cards
// designated by * (indicating any number of arbitrary bytes)
//-------------------------------------------------------------------------

class SpellBook : public MagicBook
{
public:
    SpellBook();

    bool add_spell(const char*, const char*&) override;

    void set_bookmark(const MagicPage* page = nullptr) const override
    { glob = page; }

    const MagicPage* get_bookmark() const override
    { return glob; }

private:
    bool translate(const char*, HexVector&);
    void add_spell(const char*, const char*, HexVector&, unsigned, MagicPage*);
    const MagicPage* find_spell(const uint8_t*, unsigned, const MagicPage*, unsigned) const override;

    mutable const MagicPage* glob;
};

//-------------------------------------------------------------------------
// hexes - a sequence of pipe delimited hex, text literals, and wild chars
// designated by '?' (indicating one arbitrary byte)
//-------------------------------------------------------------------------

class HexBook : public MagicBook
{
public:
    HexBook() = default;

    bool add_spell(const char*, const char*&) override;

private:
    bool translate(const char*, HexVector&);
    void add_spell(const char*, const char*, HexVector&, unsigned, MagicPage*);
    const MagicPage* find_spell(const uint8_t*, unsigned, const MagicPage*, unsigned) const override;
};

#endif

