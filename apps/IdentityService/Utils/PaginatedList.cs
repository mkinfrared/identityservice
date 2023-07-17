using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using Microsoft.EntityFrameworkCore;

namespace IdentityService.Utils;

public class PaginatedList<T>
{
    public PaginatedList(List<T> items, int count, int page, int pageSize)
    {
        TotalCount = count;
        PageSize = pageSize;
        Page = page;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        Data = items;
    }

    public int Page { get; }
    public int TotalPages { get; }
    public int PageSize { get; }
    public int TotalCount { get; }
    public List<T> Data { get; }

    public bool HasPreviousPage => Page > 1;

    public bool HasNextPage => Page < TotalPages;

    public static async Task<PaginatedList<T>> CreateAsync(
        IQueryable<T> source,
        int? pageIndex = null,
        int? pageSize = null
    )
    {
        var page = pageIndex ?? 1;
        var size = pageSize ?? 20;
        var count = await source.CountAsync();

        var items = await source
            .Skip((page - 1) * size)
            .Take(size)
            .ToListAsync();

        return new PaginatedList<T>(items, count, page, size);
    }
}

public class PaginatedListConverter<TSource, TSourceDto>
    : ITypeConverter<PaginatedList<TSource>, PaginatedList<TSourceDto>>
{
    public PaginatedList<TSourceDto> Convert(
        PaginatedList<TSource> source,
        PaginatedList<TSourceDto> destination,
        ResolutionContext context
    )
    {
        var data = context.Mapper.Map<List<TSourceDto>>(source.Data);

        return new PaginatedList<TSourceDto>(
            data,
            source.TotalCount,
            source.Page,
            source.PageSize
        );
    }
}
